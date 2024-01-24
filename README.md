*Team 4A1G — Tech Challenge WS23/24 — Technical University of Munich*

# [ChatJustus](https://4a1g.github.io/ChatJustus/)

ChatJustus is an AI Chatbot to improve the Lawyer-Client UX by supporting the entire lawyer-client interaction journey. To learn more, check out our [website](https://4a1g.github.io/ChatJustus/). There, you can also try the demo.

## Project Architecture

### Tech Stack
![stack](https://syncandshare.lrz.de/dl/fiGSUiADJMrGDKN2JggcSV/image.png?inline)
- OpenAI API: `gpt-3.5-turbo-1106`, `gpt-4-1106-preview` and `text-embedding-ada-002` for chat and document embeddings
- Our own [gpt-wrapper](https://github.com/JoongWonSeo/gpt-wrapper) for function tools, structured data generation, and more
- Qdrant for vector search, with our own [VectorDB wrapper](https://github.com/4A1G/ChatJustus/tree/main/backend/backend/database/core)
- Assistant backend
- FastAPI WebSocket server
- Our own [state synchronisation](https://github.com/4A1G/ChatJustus/blob/main/backend/backend/server/sync.py) protocol
- React + Next.js frontend
- tailwindcss and NextUI interface

### Documentation
[Here's](https://4a1g.github.io/ChatJustus/docs) a comprehensive documentation of each and every important file/folder in the project. Click on the `>` arrows to open the folders, and click on each summary box to switch between a **Short** summary and a **Long** description.  
We have created it using our self-developed AI Recursive Summarizer tool, using the same underlying technology as ChatJustus itself!
Using the tool, the entire documentation was generated in 10 minutes, what would have taken us 3-5 hours to write manually :)


## Installation
For more detailed instructions, check the [backend](https://github.com/4A1G/ChatJustus/tree/main/backend#readme) and [frontend](https://github.com/4A1G/ChatJustus/tree/main/frontend#readme) READMEs. For a quick start, follow the instructions below.

### Quick Start

To install and run the ChatJustus backend server, you will need at least git and python3.10 or higher installed. To ease the installation process, we highly recommend using [conda](https://docs.conda.io/projects/miniconda/en/latest/miniconda-install.html) and [poetry](https://python-poetry.org/docs/#installing-with-pipx).

1. Clone the repository and navigate to the backend folder
    ```bash
    git clone https://github.com/4A1G/ChatJustus.git
    cd ChatJustus/backend
    ```
2. Create the `tc` conda environment and activate it
    ```bash
    conda env create -f environment.yaml
    conda activate tc
    ```
3. Install the python dependencies
    ```bash
    poetry install
    ```
4. Copy the `.env.example` file and rename it to `.env`. Then, fill in the OpenAI API key and the gmail account details for the email functionality.

5. Create the Legal DB and populate it with data, by running the Jupyter Notebooks `create_legal_db.ipynb` and `create_lawyer_db.ipynb`. Simply press "Run All" in the Jupyter Notebook UI. Make sure to shutdown/restart the kernel after running each notebook, because the local database storage does not allow for concurrent access.

6. Start the backend server
    ```bash
    poetry run expose
    ```
    This will start the server, expose it to the local network, and automatically open a browser window with a QR code that you can scan to access the server from the same network. You could also just open the [localhost URL](http://localhost:42069/ChatJustus/) in your browser.


## Other

### Landing Page
The [landing page](https://4a1g.github.io/ChatJustus/) is also a react + next.js app, and can be found under the [landing branch](https://github.com/4A1G/ChatJustus/tree/landing?tab=readme-ov-file). It is deployed using GitHub Pages.

### Demo Server
We have a Google Cloud server running the demo, which is deployed by essentially running the same steps as in the Quick Start section.
