from gpt_wrapper.assistants import ChatGPT, MessageHistory, Tools

from backend.server.sync import Sync


class SyncedHistory(MessageHistory):
    '''
    Synced message history and currently generating partial messeage
    '''
    def __init__(self, history: list[dict]):
        # already generated messages
        self.history = history
        # the currently generating partial message (not yet added to history)
        self.partial = None
        # TODO: unsynced original partial object, and then an autocompleted version that is exposed to the frontend

        # sync everything
        self.sync = Sync("MESSAGES", self)
    
    async def append(self, message):
        # called by the assistant
        message = self.ensure_dict(message)
        self.history.append(message)
        await self.sync()
    
    async def set_partial(self, partial):
        self.partial = partial
        await self.sync()


class SyncedGPT(ChatGPT):
    model_list = [
        "gpt-3.5-turbo-1106",
        "gpt-4-1106-preview",
        "gpt-3.5-turbo",
        "gpt-4",
    ]
    
    def __init__(self, messages: SyncedHistory, tools: Tools | None = None, model: str = 'gpt-3.5-turbo', temperature: float | None = None):
        super().__init__(messages=messages, tools=tools, model=model)

        # model setting
        self.temperature = temperature or 0.9

        self.sync = Sync("GPT", self,
            on_action={
                'PROMPT': self.prompt
            },
            model_list='modelList',
            default_model='selectedModel',
            temperature=...,
            # messages=..., # self-managed
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
                        