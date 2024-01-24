import asyncio
from gpt_wrapper.assistants import ChatGPT, Tools
from gpt_wrapper.messages import MessageHistory, msg

from backend.server.sync import Sync


class SyncedHistory(MessageHistory):
    '''
    Synced message history and currently generating partial messeage
    '''
    def __init__(self, system: str = "You are a helpful assistant.", history: list[dict] = []):
        # system message
        self.system = system
        # already generated messages
        self._history = history
        # the currently generating partial message (not yet added to history)
        self.partial = None
        # TODO: unsynced original partial object, and then an autocompleted version that is exposed to the frontend

        self.sync = Sync("MESSAGES", self, on_action={
                'RESET_CHAT': self.reset,
            },
            history=...,
            partial=...,
        )
    
    @property
    def history(self):
        return [msg(system=self.system)] + self._history
    
    @history.setter
    def history(self, value):
        if len(value) > 0 and value[0].get('role') == 'system':
            self.system = value[0].get('content')
            value = value[1:]
        self._history = value
    
    async def append(self, message):
        # called by the assistant
        message = self.ensure_dict(message)
        self._history.append(message)
        await self.sync()
    
    async def reset(self):
        self._history = []
        await self.sync()
    
    async def set_partial(self, partial):
        self.partial = partial
        await self.sync()
    
    async def append_partial(self):
        if self.partial is not None:
            self._history.append(self.partial)
            self.partial = None
            await self.sync()


class SyncedGPT(ChatGPT):
    model_list = [
        "gpt-3.5-turbo-1106",
        "gpt-4-1106-preview",
        "mock",
        "echo",
    ]
    
    def __init__(self, messages: SyncedHistory, tools: Tools | None = None, model: str = 'gpt-3.5-turbo', temperature: float | None = None):
        super().__init__(messages=messages, tools=tools, model=model)

        # model setting
        self.temperature = temperature or 0.0

        self.sync = Sync("GPT", self,
            tasks={
                'PROMPT': self.prompt
            },
            on_task_cancel={
                'PROMPT': self.cancel_prompt
            },
            expose_running_tasks=True,
            model_list='modelList',
            default_model='selectedModel',
            temperature=...,
            # messages=..., # self-managed TODO: make this simply auto-inherit the key as path
        )

    async def prompt(self, prompt: str):
        async for event in self.response_events(prompt, model=self.default_model, temperature=self.temperature):
            match event:
                case self.PartialMessageEvent():
                    # set partial
                    try:
                        await self.messages.set_partial(event.message.model_dump())
                    except:
                        pass

                case self.CompletionEvent():
                    # complete, reset partial
                    await self.messages.set_partial(None)
                        
                # case self.PartialToolCallsEvent():
                #     # for each tool call id, set its partial use case draft
                #     pass
            
    async def cancel_prompt(self):
        await self.messages.append_partial()