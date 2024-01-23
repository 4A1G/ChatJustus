# Server Subpackage

This subpackage contains the server for the backend. It uses [FastAPI](https://fastapi.tiangolo.com/) as the web framework and [Uvicorn](https://www.uvicorn.org/) as the ASGI server.

We use WebSocket connections to maintain a persistent connection to the frontend, using our own simple protocol and connection manager class to handle efficient state synchronization using JSON Patches and event/action/task handlers. 

Using async functions, we can efficiently handle multiple connections without requiring many threads, and we can easily handle long-running tasks like AI model inference, database queries, and email sending without blocking the main thread.

- `server.py`: The main server file. Contains the FastAPI app and the WebSocket connection manager. It also serves the frontend static files under `/webapp_static`

- `sync.py`: Contains the connection manager and sync protocol. The connection manager handles the WebSocket connections and the sync protocol handles the JSON Patch synchronization.

- `mail.py`: Contains the email sending functions.

- `case_manager.py`: For multi-chat page like the Follow Up bot, we use this class to handle the state of each chat.