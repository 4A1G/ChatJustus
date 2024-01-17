from dotenv import load_dotenv
from fastapi.websockets import WebSocketState
load_dotenv(override=True)

import asyncio
import traceback

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from gpt_wrapper.messages import msg
from backend.assistant.first_contact import FirstContactBot
from backend.assistant.follow_up_qa import FollowUpBot
from .sync import Connection
from .synced_data import ExposeData


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
        # if we have tools, initialize them here
        # await assistant.default_tools.initialize()

        # other exposed data
        exposed_data = ExposeData()

        users[f"{assistant_type}/{session_id}"] = (connection, assistant, exposed_data)
        print(f"New session: {assistant_type}/{session_id}")

# websocket endpoint
app = FastAPI()

async def ws_auth(ws: WebSocket) -> str | None:
    try:
        await ws.send_json({"type": "_REQUEST_SESSION_ID"})
        msg = await ws.receive_json()
        if msg["type"] != "_SESSION_ID":
            raise Exception("Client did not send session id")
        
        max_retries = 5
        while msg["type"] != "_SESSION_ID" or not msg["data"] or msg["data"] in users:
            await ws.send_json({"type": "_REGEN_SESSION_ID"})
            msg = await ws.receive_json()
            max_retries -= 1
            if max_retries == 0:
                raise Exception("Client did not send valid session id")
        
        return msg["data"]
    except:
        try:
            await ws.close()
        finally:
            return None

@app.websocket("/ws/{assistant_type}")
async def websocket_endpoint(ws: WebSocket, assistant_type: str):
    print(f"New websocket connection: {assistant_type}")
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