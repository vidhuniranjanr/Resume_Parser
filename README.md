Document Q&A Chatbot

A ReactJS & Tailwind CSS frontend with a FastAPI backend that uses LangGraph and Ollama for local LLM-powered chat. Upload PDFs (e.g., resumes) and ask questions about their content.

Features
Upload PDF documents and extract text
Chatbot powered by Ollama local LLM via LangGraph chain
Responsive UI with file upload and chat interface


Quick Start
Clone repo:
bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

Start Ollama server:
bash
ollama serve

Backend:
bash
cd chatbot-backend
pip install -r requirements.txt
uvicorn main:app --reload

Frontend:
bash
cd ../chatbot-frontend
npm install
npm start
API Endpoints
POST /api/upload - Upload PDF file (form-data key: file)
POST /api/chat - Chat with prompt JSON { "prompt": "your question" }
GET /api/content - Get extracted text from uploaded file

Notes
Ensure Ollama is running and models downloaded.
Use form-data key file for uploads.
Modify model in chatbot_chain.py as needed.
