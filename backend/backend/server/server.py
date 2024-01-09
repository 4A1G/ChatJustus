from dotenv import load_dotenv
load_dotenv(override=True)

import asyncio
import traceback

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from gpt_wrapper.messages import msg
from backend.assistant.first_contact import FirstContactBot
from .sync import Connection


# connections
users = {} # {session_id: (connection, assistant)}

async def new_session(session_id: str):
    with Connection() as connection:
        assistant = FirstContactBot()
        # if we have tools, initialize them here
        # await assistant.default_tools.initialize()
        users[session_id] = (connection, assistant)

# websocket endpoint
app = FastAPI()

@app.websocket("/ws/{session_id}")
async def websocket_endpoint(ws: WebSocket, session_id: str):
    await ws.accept()
    if session_id not in users:
        await new_session(session_id)
    connection, assistant = users[session_id]

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
    "/", StaticFiles(directory="../frontend/out", html=True), name="static"
)
