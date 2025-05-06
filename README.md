import React from 'react';

export default function ReadmePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-indigo-600">📄 Document Q&A Chatbot</h1>
        <p className="text-lg">
          A full-stack chatbot to <strong>upload PDFs</strong> (like resumes) and <strong>ask questions</strong> about their content using a <strong>local LLM</strong>. Built with <code>ReactJS</code>, <code>Tailwind CSS</code>, <code>FastAPI</code>, <code>LangGraph</code>, and <code>Ollama</code>.
        </p>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-500">✨ Features</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>📁 Upload PDF documents and extract text</li>
            <li>🤖 Chat powered by Ollama and LangGraph</li>
            <li>💬 Responsive UI with file upload + chat interface</li>
            <li>⚠️ Built-in error handling</li>
            <li>⚙️ Easy model customization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-500">🚀 Quick Start</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-lg text-gray-700">1. Clone the repository</h3>
              <pre className="bg-gray-900 text-green-300 rounded-md p-4 text-sm overflow-auto">
{`git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-700">2. Start Ollama server</h3>
              <pre className="bg-gray-900 text-green-300 rounded-md p-4 text-sm overflow-auto">
{`ollama serve`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-700">3. Start Backend</h3>
              <pre className="bg-gray-900 text-green-300 rounded-md p-4 text-sm overflow-auto">
{`cd chatbot-backend
pip install -r requirements.txt
uvicorn main:app --reload`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-lg text-gray-700">4. Start Frontend</h3>
              <pre className="bg-gray-900 text-green-300 rounded-md p-4 text-sm overflow-auto">
{`cd ../chatbot-frontend
npm install
npm start`}
              </pre>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-500">🔌 API Endpoints</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><code>POST /api/upload</code> – Upload PDF file (form-data key: <code>file</code>)</li>
            <li><code>POST /api/chat</code> – Send prompt: <code>{`{ "prompt": "your question" }`}</code></li>
            <li><code>GET /api/content</code> – Get extracted file content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-indigo-500">📝 Notes</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Make sure Ollama is running with the required model downloaded</li>
            <li>Use <code>file</code> as the form-data key when uploading PDFs</li>
            <li>To change the model, update it in <code>chatbot_chain.py</code></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
