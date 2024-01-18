from dotenv import load_dotenv
load_dotenv(override=True)

import asyncio
import traceback

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from gpt_wrapper.messages import msg
from backend.assistant.first_contact import FirstContactBot
from backend.assistant.follow_up_qa import FollowUpBot
from .sync import Connection


# connections
users = {} # {assistant_type/session_id: (connection, assistant)}


assistant_factory = {
    "first_contact": FirstContactBot,
    "follow_up": FollowUpBot,
}

async def new_session(assistant_type: str, session_id: str):
    with Connection() as connection:
        if assistant_type not in assistant_factory:
            raise Exception(f"Assistant type {assistant_type} not found")
        
        assistant = assistant_factory[assistant_type]()
        # if we have tools that need to be initialized, initialize them here
        # await assistant.default_tools.initialize()

        users[f"{assistant_type}/{session_id}"] = (connection, assistant)
        print(f"New session: {assistant_type}/{session_id}")

# websocket endpoint
app = FastAPI()

async def ws_auth(ws: WebSocket) -> str | None:
    try:
        await ws.send_json({"type": "_REQUEST_USER_SESSION"})
        msg = await ws.receive_json()
        if msg["type"] != "_USER_SESSION":
            raise Exception("Client sent wrong message type")
        user = msg["data"]["user"]
        session = msg["data"]["session"]

        if not user or not session:
            raise Exception("Client sent invalid user or session")
        
        return f"{user}/{session}"
    except:
        try:
            await ws.close()
        finally:
            return None

@app.websocket("/ws/{assistant_type}")
async def websocket_endpoint(ws: WebSocket, assistant_type: str):
    await ws.accept()

    session_id = await ws_auth(ws)
    if not session_id:
        print("Failed to authenticate")
        return

    id = f"{assistant_type}/{session_id}"
    if id not in users:
        await new_session(assistant_type, session_id)
    connection = users[id][0]

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
    uvicorn.run("backend.server.server:app", port=42069)

def expose():
    import uvicorn
    uvicorn.run("backend.server.server:app", port=42069, host="0.0.0.0")