'''
This module defines a simple state syncing protocol between the frontend and the backend.

Concepts:
- Connection: A connection to the frontend. There should be one instance of this class per user session, even across reconnects of the websocket.
- Event: This is the primitive of the protocol. Every event is of type {type: str, data: any}.
    - Set Event: Overwrite the full value of the state
    - Get Event: Request the full value of the state
    - Patch Event: Apply a jsonpatch to the state, i.e. a list of operations
    - Action Event: Dispatch an action, can be handled however defined
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
        self.event_handlers: dict[str, Callable] = {} # triggered on event
        self.init_handlers: list[Callable] = [] # triggered on connection init
    
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
            await self.send("_DISCONNECT", None)
            await self.ws.close()
        self.ws = ws

        await self.init()
    
    async def init(self):
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

def task_start_event(key: str):
    '''Task has been started'''
    return f"_TASK_START:{key}"

def task_cancel_event(key: str):
    '''Task has been cancelled'''
    return f"_TASK_CANCEL:{key}"

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
        tasks: dict[str, Callable] | None = None,
        on_task_cancel: dict[str, Callable] | None = None,
        send_on_init: bool = True,
        expose_running_tasks: bool = False,
        **sync_attributes: dict[str, Ellipsis]
    ):
        '''
        Register the attributes that should be synced with the frontend.
        
        Args:
            key: unique key for this object
            obj: the object whose attributes should be synced
            connection: the connection to use, if None, use the global connection
            on_action: either an action handler taking a single action dict, or a dict of action handlers for each action type, each taking the data of the action as keyword arguments
            tasks: a dict of task factories for each task type, each returning a coroutine to be used as a task
            on_task_cancel: a dict of task cancel handlers for each task type
            send_on_init: whether to send the state on connection init
            expose_running_tasks: whether to expose the running tasks to the frontend
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
        
        # task handler
        self.running_tasks: dict[str, asyncio.Task] = {}
        if tasks:
            self.on_task_start, self.on_task_cancel = self._create_task_handlers(tasks, on_task_cancel)
        else:
            self.on_task_start, self.on_task_cancel = None, None

        # register attributes to sync
        for attr in sync_attributes:
            assert attr in dir(obj), f"Failed to register attribute: Object has no attribute {attr}"

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
        
        self.expose_running_tasks = expose_running_tasks
        
        # create reverse-lookup for patching
        self.key_to_attr = {
            key: attr
            for attr, key in self.sync_attributes.items()
        }

        # assertions
        assert len(self.sync_attributes) + expose_running_tasks > 0, "No attributes to sync"
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
        } | ({"runningTasks": list(self.running_tasks.keys())} if self.expose_running_tasks else {})
    
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
        if self.on_task_start:
            self.connection.register_event(task_start_event(self.key), self.on_task_start)
        if self.on_task_cancel:
            self.connection.register_event(task_cancel_event(self.key), self.on_task_cancel)
    
    def _deregister(self):
        self.connection.deregister_event(get_event(self.key))
        self.connection.deregister_event(set_event(self.key))
        self.connection.deregister_event(patch_event(self.key))
        if self.send_on_init:
            self.connection.init_handlers.remove(self._send_state)
        if self.on_action:
            self.connection.deregister_event(action_event(self.key))
        if self.on_task_start:
            self.connection.deregister_event(task_start_event(self.key))
        if self.on_task_cancel:
            self.connection.deregister_event(task_cancel_event(self.key))

    async def _send_state(self, _ = None):
        self.state_snapshot = self._snapshot()
        await self.connection.send(set_event(self.key), self.state_snapshot)

    async def _set_state(self, new_state):
        for attr, value in new_state.items():
            setattr(self.obj, attr, value)

    async def _patch_state(self, patch):
        self.state_snapshot = jsonpatch.apply_patch(self.state_snapshot, patch, in_place=True)
        for key, value in self.state_snapshot.items():
            if self.expose_running_tasks and key == 'runningTasks':
                continue
            setattr(self.obj, self.key_to_attr[key], deepcopy(value))
    
    @staticmethod
    def _create_action_handler(handlers: dict[str, Callable]):
        async def _handle_action(action: dict):
            action_type = action.pop('type')
            if action_type in handlers:
                await handlers[action_type](**action)
            else:
                print(f"Warning: No handler for action {type}")
        return _handle_action
    
    def _create_task_handlers(self, factories: dict[str, Callable], on_cancel: dict[str, Callable] | None):
        async def _run_and_pop(task, task_type: str):
            try:
                await task
            except asyncio.CancelledError:
                print(f"Task {task_type} cancelled")
                if on_cancel and task_type in on_cancel:
                    await on_cancel[task_type]()
                raise    
            finally:
                self.running_tasks.pop(task_type, None)
                if self.expose_running_tasks:
                    print(f"syncing running tasks: {list(self.running_tasks.keys())}")
                    await self.sync()

        async def _create_task(task: dict):
            task_type = task.pop('type')
            if task_type in factories:
                if task_type not in self.running_tasks:
                    todo = factories[task_type](**task)
                    task = asyncio.create_task(_run_and_pop(todo, task_type))
                    self.running_tasks[task_type] = task
                    if self.expose_running_tasks:
                        print(f"syncing running tasks: {list(self.running_tasks.keys())}")
                        await self.sync()
                else:
                    print(f"Warning: Task {task_type} already running")
            else:
                print(f"Warning: No factory for task {task_type}")
    
        async def _cancel_task(task: dict):
            task_type = task.pop('type')
            if task_type in self.running_tasks:
                self.running_tasks[task_type].cancel()
            else:
                print(f"Warning: Task {task_type} not running")
        
        return _create_task, _cancel_task


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
        await self.sync()
    
    async def send_action(self, action: dict[str, any]):
        '''
        Send an action to the frontend.
        '''
        await self.connection.send(action_event(self.key), action)
    
    async def toast(self, *messages, type: str = 'default') -> str:
        '''
        Send a toast message to the frontend.
        Returns the sent message content, so that you can easily return or print it.
        '''
        messages = ' '.join(str(message) for message in messages)
        await self.connection.send('_TOAST', {"type": type, "message": messages})
        return messages



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
