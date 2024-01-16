from dotenv import load_dotenv
load_dotenv(override=True)

import asyncio
import traceback

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from gpt_wrapper.messages import msg
from backend.assistant.first_contact import FirstContactBot
from .sync import Connection
from .synced_data import ExposeData


# connections
users = {} # {session_id: (connection, assistant)}

async def new_session(session_id: str):
    with Connection() as connection:
        assistant = FirstContactBot()
        # if we have tools, initialize them here
        # await assistant.default_tools.initialize()

        # other exposed data
        exposed_data = ExposeData()

        users[session_id] = (connection, assistant, exposed_data)

# websocket endpoint
app = FastAPI()

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(ws: WebSocket, session_id: str):
    await ws.accept()
    if session_id not in users:
        await new_session(session_id)
    connection = users[session_id][0]

    try:
        await connection.new_connection(ws)
        await connection.handle_connection()
    except Exception:
        print(f"Error in connection handler: {traceback.format_exc()}")
    finally:
        try:
            connection.ws = None
            await ws.close()
        except:
            pass


# it's important this is mounted after the websocket route
app.mount(
    "/", StaticFiles(directory="webapp_static", html=True), name="static"
)


def start():
    import uvicorn
    uvicorn.run(app, port=42069)

def dev():
    import uvicorn
    uvicorn.run(app, port=42069, reload=True)