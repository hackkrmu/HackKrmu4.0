import streamlit as st
import cv2
import numpy as np
import pyttsx3
import os
import uuid
import tempfile
import re
from streamlit_webrtc import webrtc_streamer, WebRtcMode
from transformers import pipeline
from audio_recorder_streamlit import audio_recorder
from tensorflow.keras.models import load_model

# Constants
SEQUENCE_LENGTH = 30
IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64
CLASSES_LIST = ["Namaste", "Good Afternoon", "Good Night", "How are you"]

VIDEO_MAPPING = {
    "goodafternoon": "data/Good_Afternoon.mp4",
    "namaste": "data/Namaste.mp4",
    "goodnight": "data/Good_Night.mp4",
    "howareyou": "data/How_Are_You.mp4"
}

# Load models once
@st.cache_resource
def load_models():
    lrcn_model = load_model("LRCN_model.h5")
    whisper_pipe = pipeline("automatic-speech-recognition", model="openai/whisper-base")
    return lrcn_model, whisper_pipe

LRCN_model, whisper_pipe = load_models()

# Utility Functions
def process_audio(audio_bytes):
    """Process speech input and convert it to text."""
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
        tmp_file.write(audio_bytes)
        result = whisper_pipe(tmp_file.name)
    cleaned_text = clean_text(result["text"])
    return cleaned_text


def clean_text(text):
    """Clean the text for better matching."""
    return re.sub(r'[^\w\s]', '', text).strip().lower().replace(" ", "")


def predict_sign(frames):
    """Predict sign language gesture from frames."""
    frames_array = np.expand_dims(frames, axis=0)
    pred_probs = LRCN_model.predict(frames_array)[0]
    pred_label = np.argmax(pred_probs)
    return CLASSES_LIST[pred_label], pred_probs[pred_label]


def text_to_sign(text):
    """Map recognized text to corresponding sign language video."""
    cleaned_text = clean_text(text)
    return VIDEO_MAPPING.get(cleaned_text, None)


def speak(text):
    """Convert text to speech."""
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


# Streamlit UI
st.title("Sign-Speech Communication Assistant")

# Generate a unique room ID only once per session
if "room_id" not in st.session_state:
    st.session_state.room_id = str(uuid.uuid4())[:8]

room_id = st.text_input("Enter Room ID to Join or Create a New One:", value=st.session_state.room_id)

# Select user role
role = st.radio("Select Role:", ("Special Person (Sign to Speech)", "Normal Person (Speech to Sign)"))

# WebRTC streaming
webrtc_ctx = webrtc_streamer(
    key=room_id,
    mode=WebRtcMode.SENDRECV,
    rtc_configuration={"iceServers": [{"urls": ["stun:stun.l.google.com:19302"]}]},
    media_stream_constraints={"video": True, "audio": True},
)

# Ensure both users are connected
if webrtc_ctx.state.playing:
    st.success("Both users are connected! You can now communicate.")
else:
    st.warning("Waiting for users to join...")

# Special Person: Sign to Speech
if role == "Special Person (Sign to Speech)":
    st.header("Sign Language to Speech Conversion")
    
    if "frames" not in st.session_state:
        st.session_state.frames = []
    
    camera_input = st.camera_input("Capture Sign Language Video")
    if camera_input:
        img_bytes = camera_input.getvalue()
        img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (IMAGE_HEIGHT, IMAGE_WIDTH))
        img = img / 255.0
        
        if len(st.session_state.frames) < SEQUENCE_LENGTH:
            st.session_state.frames.append(img)
        else:
            st.session_state.frames = st.session_state.frames[1:] + [img]
        
        progress = len(st.session_state.frames) / SEQUENCE_LENGTH
        st.progress(progress)
        
        if len(st.session_state.frames) == SEQUENCE_LENGTH:
            sign, confidence = predict_sign(st.session_state.frames)
            st.success(f"Detected Sign: {sign} (Confidence: {confidence:.2f})")
            speak(sign)  # Send speech output to Normal Person
            st.session_state.frames = []

# Normal Person: Speech to Sign
elif role == "Normal Person (Speech to Sign)":
    st.header("Speech to Sign Language Conversion")
    audio_bytes = audio_recorder()
    
    if audio_bytes:
        with st.spinner("Processing audio..."):
            text = process_audio(audio_bytes)
            if text:
                st.info(f"Recognized Text: {text}")
                video_path = text_to_sign(text)
                
                if video_path and os.path.exists(video_path):
                    st.session_state.video_path = video_path
                else:
                    st.warning("No matching sign language video found.")

if role == "Special Person (Sign to Speech)":
    if "video_path" in st.session_state and st.session_state.video_path:
        st.video(st.session_state.video_path)  # Keep showing the last received video until new input
    else:
        st.warning("Waiting for input from the Normal Person...")
