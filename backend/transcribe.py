# import whisper

# model = whisper.load_model("medium")
# result = model.transcribe("C:/Users/Mahesh G/Documents/Sound recordings/file1.m4a")
# print(result["text"])

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import whisper

app = Flask(__name__)
CORS(app)
model = whisper.load_model("medium")
@app.route('/transcribe', methods = ["POST"])
def upload_audio():
    if 'audio' not in request.files:
        return {"transcript": "No audio file provided"}, 400
    
    audio_file = request.files['audio']
    audio_file_path = "uploaded_recording.wav"
    audio_file.save(audio_file_path)
    print("Audio was uploaded")

    try:
        result = model.transcribe(audio_file_path)
        transcription = result.get("text", " ")
        print("Transcripted", transcription)
        return jsonify({"transcript": transcription}), 200
    except Exception as e:
        print("Error during transcription:", e)
        return jsonify({"transcript":"Error during transcription"}), 500        

if __name__ == '__main__':
    app.run(port=5000, debug = True)