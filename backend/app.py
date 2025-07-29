import os
import requests
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
MODEL = "gpt-3.5-turbo"

def load_system_prompts():
    with open('system_prompts.json', 'r', encoding='utf-8') as f:
        return json.load(f)

def load_user_data():
    try:
        with open('user_data.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        return {"emotional_archetype": None}

def save_user_data(data):
    with open('user_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

@app.route('/api/chat', methods=['POST'])
def completions():
    data = request.get_json(silent=True) or {}
    user_prompt = data.get("prompt", "").strip()
    conversation_history = data.get("conversation_history", [])
    chat_type = data.get("chat_type", "emotional_map")
    emotional_archetype = data.get("emotional_archetype")

    if not user_prompt:
        return jsonify(error="Prompt is required"), 400

    system_prompts = load_system_prompts()
    system_prompt = system_prompts.get(chat_type, system_prompts["emotional_map"])
    
    if emotional_archetype:
        system_prompt += f"\n\nUser's Emotional Archetype: {emotional_archetype}"

    # message list
    messages = [{"role": "system", "content": system_prompt}]
    for msg in conversation_history:
        role = msg.get("role")
        content = msg.get("content")
        if role in ("user", "assistant") and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": user_prompt})

    payload = {
        "model": MODEL,
        "messages": messages
    }
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        timeout = int(os.getenv("OPENAI_TIMEOUT", "60"))
        resp = requests.post(OPENAI_API_URL, headers=headers, json=payload, timeout=timeout)
        resp.raise_for_status()
        choice = resp.json()["choices"][0]["message"]
        
        # extract and save archetype
        if chat_type == "emotional_map" and "archetype_code" in choice["content"].lower():
            user_data = load_user_data()
            user_data["emotional_archetype"] = choice["content"]
            save_user_data(user_data)
        
        return jsonify(response=choice["content"])
    except requests.exceptions.Timeout:
        return jsonify(error="Request timed out"), 504
    except requests.exceptions.RequestException as e:
        return jsonify(error=f"API request failed: {e}"), 500

@app.route('/api/archetype', methods=['GET'])
def get_archetype():
    user_data = load_user_data()
    return jsonify(emotional_archetype=user_data.get("emotional_archetype"))

@app.route('/api/archetype/saved', methods=['GET'])
def is_archetype_saved():
    user_data = load_user_data()
    archetype = user_data.get("emotional_archetype")
    has_archetype = archetype is not None and archetype.strip() != ""
    return jsonify(archetype_saved=has_archetype)

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
