from flask import Flask, render_template, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.get_json()
    subjects = data.get("subjects", [])

    if not subjects:
        return jsonify({"error": "No subjects provided"}), 400

    try:
        subjects_text = ""
        for s in subjects:
            subjects_text += f"Subject: {s['name']}, Marks so far: {s['obtained']}/{s['total']}, Final exam marks: {s['final']}\n"

        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": """You are a helpful academic advisor. 
Given a student's current marks and remaining final exam marks, calculate:
1. Current percentage for each subject
2. Minimum marks needed in finals to pass (passing is 50%)
3. Marks needed to get an A (80% or above)
4. Overall GPA estimate
5. Which subjects need most attention
Be encouraging and give specific advice for each subject.
Format your response clearly with sections for each subject."""
                },
                {
                    "role": "user",
                    "content": f"Here are my subject marks:\n\n{subjects_text}\nPlease analyze my grades and tell me what I need to score in finals."
                }
            ]
        )

        answer = completion.choices[0].message.content
        return jsonify({"answer": answer})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)