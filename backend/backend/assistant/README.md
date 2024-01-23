# AI Assistant Subpackage

This subpackage contains the AI Assistants for the backend. Here the base ChatGPT API and prompts and tools are defined.

- `first_contact.py`: The first contact assistant which potential clients will interact with.
The bot has access to the following tools:
    - `summarize_first_contact`: The bot can send a summary of the first contact to the lawyer.
    - `end_chat`: The bot can end the chat at any time.

- `follow_up_qa.py`: After each meeting with the lawyer, the client receives a follow up email containing the summary of the meeting and a link to this bot. The client can ask questions about the meeting and the bot will answer them.
The bot has access to the following tools:
    - `query_law_articles`: Search the Legal DB for relevant law articles.
    - `query_dialog`: Search the Case DB for direct quotes from previous meeting transcripts.
    - `message_lawyer`: Send a message to the lawyer. Since currently there's no real lawyer to send the message to, the bot will just report success.
    - `schedule_meeting`: Schedule a meeting with the lawyer. Since currently there's no real lawyer to schedule a meeting with, the bot will just report success.
    - `end_chat`: The bot can end the chat at any time.