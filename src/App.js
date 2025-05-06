import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(null);

  const [extractedText, setExtractedText] = useState("");

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const sendMessage = async () => {
    const prompt = editor?.getText();
    if (!prompt?.trim()) return;
    setLoading(true);
    setError(null);

    try {
      
      const res = await axios.post("http://localhost:8000/api/chat", { prompt });

      
      setMessages((prev) => [
        ...prev,
        { role: "user", content: prompt },
        { role: "bot", content: res.data.response },
      ]);
      editor.commands.clearContent();
    } catch (err) {
      setError("Failed to send message. Try again.");
    } finally {
      setLoading(false);
    }
  };;

  const uploadFile = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setUploadStatus("Uploading...");
    setError(null);
  
    try {
      await axios.post("http://localhost:8000/api/upload", formData);
      setUploadStatus("Upload successful ✔️");
  
      // 👇 Fetch extracted content right after successful upload
      const res = await axios.get("http://localhost:8000/api/content");
      setExtractedText(res.data.extracted_text);
    } catch (err) {
      setUploadStatus("❌ Upload failed");
      setError("Error uploading file.");
    }
  };
  
  return (
    <div className="max-w-xl mx-auto chat-container space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-800">Resume Parser</h1>


      <div className="space-y-3">
      
        {messages.map((m, i) => (
          <div
          key={i}
          className={`message-bubble ${m.role === "user" ? "message-user" : "message-bot"}`}
        >
          <span className="font-semibold capitalize">{m.role}:</span> {m.content}
        </div>
        
        ))}
      </div>

      <div className="border rounded p-2">
        <EditorContent editor={editor} className="min-h-[100px]" />
      </div>

      <div className="flex space-x-2">
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <div className="mt-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block mb-2"
        />
        <button
          onClick={uploadFile}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Upload File
        </button>
        {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
      </div>
      {extractedText && (
      <div className="bg-yellow-100 p-3 rounded">
        <strong>Extracted Content Preview:</strong>
        <pre className="whitespace-pre-wrap">{extractedText}</pre>
      </div>
      )}

      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
}

export default App;
