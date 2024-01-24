from dotenv import load_dotenv
from fastapi.responses import FileResponse
load_dotenv(override=True)

import asyncio
import traceback

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.staticfiles import StaticFiles

from gpt_wrapper.messages import msg
from backend.assistant.first_contact import FirstContactBot
from backend.assistant.follow_up_qa import FollowUpBot, NoCaseException
from backend.database.schemas import cases_db, meetings_db
from .sync import Connection
from .utils import get_ip, open_qr


# connections
sessions = {} # {user_id: (connection, assistant)}}


def assistant_factory(assistant_type:str, case_id: str):
    match assistant_type:
        case "first_contact":
            return FirstContactBot(case_id)
        
        case "follow_up":
            # init case
            db = cases_db()
            try:
                case = db.retrieve([case_id])[0]
                print(f"Case {case_id} found")
            except:
                raise NoCaseException(f"Case {case_id} not found")
            return FollowUpBot(case)
        
        case _:
            raise Exception(f"Assistant type {assistant_type} not found")


async def new_session(assistant_type: str, case_id: str, id: str, ws: WebSocket):
    with Connection() as connection:
        try:
            assistant = assistant_factory(assistant_type, case_id)
        except NoCaseException as e:
            await connection.disconnect("You are not assigned to a case. Please first visit First Contact!", ws)
            return False
        except Exception as e:
            await connection.disconnect(f"Error: {e}", ws)
            return False

        # if we have tools that need to be initialized, initialize them here
        # await assistant.default_tools.initialize()

        sessions[id] = (connection, assistant)
        print(f"New session: {id}")
        return True

# server
app = FastAPI()

@app.get("/admin/sessions")
async def get_sessions():
    return list(sessions.keys())

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
        
        return user, session
    except:
        try:
            await ws.close()
        finally:
            return None, None


@app.websocket("/ws/demo/{assistant_type}/{case_id}")
async def websocket_endpoint(ws: WebSocket, assistant_type: str, case_id: str):
    await ws.accept()

    user_id, session_id = await ws_auth(ws)
    if not session_id:
        print("Failed to authenticate")
        return

    id = f"demo/{assistant_type}/{session_id}"
    if not await new_session(assistant_type, case_id, id, ws):
        return
    connection = sessions[id][0]

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


@app.websocket("/ws/{assistant_type}")
async def websocket_endpoint(ws: WebSocket, assistant_type: str):
    await ws.accept()

    user_id, session_id = await ws_auth(ws)
    if not user_id:
        print("Failed to authenticate")
        return

    id = f"{assistant_type}/{user_id}"
    if id not in sessions:
        case_id = user_id
        if not await new_session(assistant_type, case_id, id, ws):
            return
    connection = sessions[id][0]

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


# override the endpoints to include .html
@app.get("/ChatJustus/first-contact")
async def first_contact():
    return FileResponse("webapp_static/ChatJustus/first-contact.html")

@app.get("/ChatJustus/follow-up")
async def follow_up():
    return FileResponse("webapp_static/ChatJustus/follow-up.html")

@app.get("/ChatJustus/demo-first-contact")
async def first_contact():
    return FileResponse("webapp_static/ChatJustus/demo-first-contact.html")

@app.get("/ChatJustus/demo-follow-up")
async def follow_up():
    return FileResponse("webapp_static/ChatJustus/demo-follow-up.html")

# it's important this is mounted after the websocket route
app.mount(
    "/", StaticFiles(directory="webapp_static", html=True), name="static"
)


def start():
    import uvicorn
    uvicorn.run("backend.server.server:app", port=42069)

def expose():
    import uvicorn
    open_qr(f"http://{get_ip()}:42069/ChatJustus", 256)
    uvicorn.run("backend.server.server:app", port=42069, host="0.0.0.0")

def expose_no_qr():
    import uvicorn
    uvicorn.run("backend.server.server:app", port=42069, host="0.0.0.0")