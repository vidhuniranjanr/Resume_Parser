from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pypdf import PdfReader
from pydantic import BaseModel
from chatbot_chain import chat_graph

app = FastAPI()

# --- CORS Middleware for React frontend ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
uploaded_content = ""  

conversation_state = {"messages": []}

class PromptRequest(BaseModel):
    prompt: str


from fastapi import HTTPException

@app.post("/api/chat")
async def chat(request: PromptRequest):
    if not uploaded_content.strip():
        return {"response" :"Please upload your relevant document"}
    try:
        combined_prompt = f"Context:\n{uploaded_content}\n\nUser: {request.prompt}"
        conversation_state["messages"].append({"role": "user", "content": combined_prompt})
        result = chat_graph.invoke(conversation_state)
        return {"response": result["messages"][-1]["content"]}
    except Exception as e:
        print("Error in /api/chat:", e)
        raise HTTPException(status_code=500, detail=str(e))



@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    global uploaded_content
    content = ""
    try:
        reader = PdfReader(file.file)
        for page in reader.pages:
            content += page.extract_text() or ""
        uploaded_content = content  # Store it globally
        return {"extracted_text": content}
    except Exception as e:
        return {"error": str(e)}

@app.get("/api/content")
def get_uploaded_content():
    return{"extracted_text":uploaded_content}
