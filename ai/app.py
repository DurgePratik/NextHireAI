from flask import Flask
from flask import request
from flask import jsonify

from parser import parse_resume

import os

app = Flask(__name__)


@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "AI Service Running"
    })


@app.route("/parse-resume", methods=["POST"])
def parse():

    if "resume" not in request.files:
        return jsonify({
            "success": False,
            "message": "No resume uploaded"
        })

    file = request.files["resume"]

    temp_path = "temp_resume.pdf"

    file.save(temp_path)

    result = parse_resume(temp_path)

    os.remove(temp_path)

    return jsonify({
        "success": True,
        "skills": result["skills"]
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )