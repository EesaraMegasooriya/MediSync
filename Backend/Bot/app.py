from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BlenderbotTokenizer, BlenderbotForConditionalGeneration

# ✅ Load fine-tuned model
MODEL_PATH = "./blenderbot-medical"
tokenizer = BlenderbotTokenizer.from_pretrained(MODEL_PATH)
model = BlenderbotForConditionalGeneration.from_pretrained(MODEL_PATH)

# ✅ System prompt
SYSTEM_PROMPT = (
    "You are a professional AI medical assistant. "
    "You provide evidence-based, factual, and reliable medical information. "
    "If the user asks about emergency situations, advise them to contact a doctor immediately. "
    "Do not provide personal diagnoses. Always remain professional and accurate."
)

# ✅ Flask setup
app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])

def chat():
    try:
        data = request.json
        user_input = data.get("message", "").strip()

        if not user_input:
            return jsonify({"reply": "Please enter a valid medical question."}), 400

        # Lowercase input for matching
        lower_input = user_input.lower()

        # ✅ Hardcoded greetings and common phrases
        greeting_responses = {
            "hi": "Hello! I'm your medical assistant. How can I help you today?",
            "hello": "Hi there! How can I assist you with your health concerns?",
            "hey": "Hey! Feel free to describe your symptoms.",
            "good morning": "Good morning! How can I help you today?",
            "good evening": "Good evening! What health question do you have?",
            "thanks": "You're welcome! Stay healthy.",
            "thank you": "Glad I could help!",
            "bye": "Take care! Feel free to reach out if you have more questions."
        }

        if lower_input in greeting_responses:
            return jsonify({"reply": greeting_responses[lower_input]})

        # ✅ Fallback for too short or meaningless input
        if len(user_input) < 3 or not any(c.isalpha() for c in user_input):
            return jsonify({
                "reply": "I'm not sure how to help with that. Please describe your symptoms or ask a medical question."
            })

        # ✅ Format input with system prompt
        formatted_input = f"{SYSTEM_PROMPT}\nUser: {user_input}\nAssistant:"
        inputs = tokenizer(formatted_input, return_tensors="pt")
        output = model.generate(**inputs)
        response = tokenizer.decode(output[0], skip_special_tokens=True)

        return jsonify({"reply": response})

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": "Something went wrong on the server"}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
