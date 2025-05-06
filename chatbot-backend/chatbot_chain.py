# chatbot-backend/chat_graph.py

from langgraph.graph import StateGraph
#from langgraph.checkpoint import MemorySaver
import requests

def call_ollama_model(prompt):
    res = requests.post("http://localhost:11434/api/generate", json={
        "model": "mistral",
        "prompt": prompt,
        "stream": False
    })
    return res.json()["response"]

def create_chat_graph():
    def chatbot_fn(state):
        user_msg = state['messages'][-1]['content']
        reply = call_ollama_model(user_msg)
        state['messages'].append({"role": "assistant", "content": reply})
        return state

    builder = StateGraph(dict)
    builder.set_entry_point("input")
    builder.add_node("input", chatbot_fn)
    builder.set_finish_point("input")
    return builder.compile()

chat_graph = create_chat_graph()
