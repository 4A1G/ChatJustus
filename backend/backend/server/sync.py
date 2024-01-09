'''
This module defines a simple state syncing protocol between the frontend and the backend.

Concepts:
- Connection: A connection to the frontend. There should be one instance of this class per user session, even across reconnects of the websocket.
- Event: This is the primitive of the protocol. Every event is of type {type: str, data: any}.
    - Set Event: Overwrite the full value of the state
    - Get Event: Request the full value of the state
    - Patch Event: Apply a jsonpatch to the state, i.e. a list of operations
    - Action Event: Dispatch an action, can be handled however defined

For actions, you can subscribe to the action event by calling self.connection.subscribe(action_event(key), handler), and dispatch actions by calling self.connection.dispatch(action_event(key), action).
'''

import traceback
import asyncio
from typing import Any, Callable, TypeAlias, overload
from copy import deepcopy
from fastapi import WebSocket, WebSocketDisconnect
import jsonpatch

# global default connection, which can be temporarily overwritten by the context manager
_global_connection = None

class Connection:
    '''
    This is a counter-part to the ConnectionManager in the frontend.
    There should be one instance of this class per user session, even across reconnects of the websocket. This means the states that belong to the user session should be subscribed to the events of this class.
    It defines a simple state-syncing protocol between the frontend and the backend, every event being of type {type: str, data: any}.
    '''
    def __init__(self):
        self.ws = None
        self.event_handlers: dict[str, Callable] = {}
        self.init_handlers: list[Callable] = []
    
    @property
    def is_connected(self):
        return self.ws is not None

    #===== Low-Level: Register Event Callbacks =====#
    def register_event(self, event: str, callback: Callable):
        if event in self.event_handlers:
            raise Exception(f"Event {event} already has a subscriber.")
        self.event_handlers[event] = callback
    
    def deregister_event(self, event: str):
        if event not in self.event_handlers:
            raise Exception(f"Event {event} has no subscriber.")
        del self.event_handlers[event]
    
    def register_init(self, callback: Callable):
        self.init_handlers.append(callback)
    
    #===== Low-Level: Networking =====#
    async def new_connection(self, ws: WebSocket):
        if self.ws is not None:
            print("Warning: Overwriting existing websocket.")
            await self.ws.close()
        self.ws = ws

        for handler in self.init_handlers:
            await nonblock_call(handler)
                
    async def send(self, event: str, data: any):
        if self.ws is None:
            return
        try:
            await self.ws.send_json({"type": event, "data": data})
        except Exception as e:
            print(f"Error sending event {event}: {e}")
    
    async def handle_connection(self):
        assert self.ws is not None
        try:
            while True:
                data = await self.ws.receive_json()
                event = data.get("type")
                if event in self.event_handlers:
                    # TODO: add support for task creation for long-running handlers
                    print(f"Received event {event}: {data.get('data')}")
                    handler = self.event_handlers[event]
                    await nonblock_call(handler, data.get("data"))
                else:
                    print(f"Received event {event} but no subscriber was found.")
        except WebSocketDisconnect:
            print("websocket disconnected")
        except Exception:
            print(f"Error while handling connection: {traceback.format_exc()}")
        finally:
            try:
                ws = self.ws
                self.ws = None
                await ws.close()
            except:
                pass
    
    #===== High-Level: Context Manager =====#
    def __enter__(self):
        global _global_connection
        self._prev_global_connection = _global_connection
        _global_connection = self
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        global _global_connection
        _global_connection = self._prev_global_connection
        self._prev_global_connection = None


# Event Type Helpers
def set_event(key: str):
    '''State has been set'''
    return f"_SET:{key}"

def get_event(key: str):
    '''State has been requested'''
    return f"_GET:{key}"

def patch_event(key: str):
    '''State has been patched'''
    return f"_PATCH:{key}"

def action_event(key: str):
    '''Action has been dispatched'''
    return f"_ACTION:{key}"

# TODO: for key-space, global key prefix and context manager function in Sync

class Sync:
    '''
    Register an object's attributes to this class to sync them with the frontend.
    '''
    def __init__(
        self,
        key: str,
        obj: object,
        connection: Connection | None = None,
        on_action: Callable | dict[str, Callable] | None = None,
        send_on_init: bool = True,
        **sync_attributes: dict[str, Ellipsis]
    ):
        '''
        Register the attributes that should be synced with the frontend.
        
        Args:
            key: unique key for this object
            obj: the object whose attributes should be synced
            connection: the connection to use, if None, use the global connection
            on_action: either an action handler taking a single action dict, or a dict of action handlers for each action type, each taking the data of the action as keyword arguments
            sync_attributes: attribute names to observe, value being either ... or a string of the key of the attribute, leave empty to observe all attributes
        '''
        self.key = key
        self.obj = obj
        self.send_on_init = send_on_init

        # connection, usually from the "global provider", i.e. the context manager
        self.connection = connection or _global_connection
        assert self.connection is not None, "No connection, either pass it as an argument or use the global connection using the context manager!"

        # action handler
        if isinstance(on_action, dict):
            self.on_action = self._create_action_handler(on_action)
        else:
            self.on_action = on_action

        # register attributes to sync
        for attr in sync_attributes:
            assert hasattr(obj, attr), f"Failed to register attribute: Object has no attribute {attr}"

        self.sync_attributes = {
            attr: attr if key is ... else key
            for attr, key in sync_attributes.items()
        }

        # if no attributes are specified, observe all non-private attributes
        if len(self.sync_attributes) == 0:
            self.sync_attributes = {
                attr: attr
                for attr in dir(obj)
                if not attr.startswith('_')
                    and not callable(getattr(obj, attr))
                    and not isinstance(getattr(obj, attr), Sync)
            }
        
        # create reverse-lookup for patching
        self.key_to_attr = {
            key: attr
            for attr, key in self.sync_attributes.items()
        }

        # assertions
        assert len(self.sync_attributes) > 0, "No attributes to sync"
        print(f"{self.key}: Syncing {self.sync_attributes}")
        for key in self.sync_attributes.values():
            if '_' in key:
                print(f"[WARNING]: key {key} seems to be in snake_case, did you forget to convert it to CamelCase?")

        # the snapshot is the exact state that the frontend has, so we can calculate the patch
        self.state_snapshot = self._snapshot()

        self._register()


    #===== Low-Level: State Management =====#
    def _snapshot(self):
        return {
            key: deepcopy(getattr(self.obj, attr))
            for attr, key in self.sync_attributes.items()
        }
    
    def observe(self, obj, **sync_attributes: dict[str, Ellipsis]):
        '''
        Observe additional attributes, useful for when you're extending/subclassing an already Synced object, or when you want to observe multiple objects.
        '''
        ...
        # TODO: append, deregister, re-register

    #===== Low-Level: Register Event Callbacks =====#
    def _register(self):
        self.connection.register_event(get_event(self.key), self._send_state)
        self.connection.register_event(set_event(self.key), self._set_state)
        self.connection.register_event(patch_event(self.key), self._patch_state)
        if self.send_on_init:
            self.connection.register_init(self._send_state)
        if self.on_action:
            self.connection.register_event(action_event(self.key), self.on_action)

    async def _send_state(self, _ = None):
        self.state_snapshot = self._snapshot()
        await self.connection.send(set_event(self.key), self.state_snapshot)

    async def _set_state(self, new_state):
        for attr, value in new_state.items():
            setattr(self.obj, attr, value)

    async def _patch_state(self, patch):
        self.state_snapshot = jsonpatch.apply_patch(self.state_snapshot, patch, in_place=True)
        for key, value in self.state_snapshot.items():
            setattr(self.obj, self.key_to_attr[key], deepcopy(value))
    
    @staticmethod
    def _create_action_handler(handlers: dict[str, Callable]):
        async def _handle_action(action: dict):
            action_type = action.pop('type')
            if action_type in handlers:
                await handlers[action_type](**action)
            else:
                print(f"Warning: No handler for action {action_type}")
        return _handle_action
    

    #===== High-Level: Sync and Actions =====#
    async def sync(self):
        '''
        Sync all registered attributes.
        '''
        if not self.connection.is_connected:
            return
        
        # calculate patch
        prev = self.state_snapshot
        self.state_snapshot = self._snapshot()
        patch = jsonpatch.make_patch(prev, self.state_snapshot).patch

        if len(patch) > 0:
            await self.connection.send(patch_event(self.key), patch)
    
    async def __call__(self):
        '''
        Sync all registered attributes.
        '''
        # await asyncio.sleep(0.5)
        await self.sync()
    
    async def send_action(self, action: dict[str, any]):
        '''
        Send an action to the frontend.
        '''
        await self.connection.send(action_event(self.key), action)



# Utils
async def nonblock_call(func: Callable, *args, **kwargs):
    '''
    Call a function without blocking the current thread.
    '''
    if asyncio.iscoroutinefunction(func):
        return await func(*args, **kwargs)
    else:
        print("Warning: function is not async.")
        return await asyncio.to_thread(func, *args, **kwargs)

