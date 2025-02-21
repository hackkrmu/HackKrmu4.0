import random
import cv2
from deepface import DeepFace

emotions = ["happy", "sad", "angry", "surprised"]

def capture_and_detect_emotion():
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        return None, "Error: Unable to access the webcam."

    ret, frame = cap.read()
    if not ret:
        return None, "Error: Unable to capture frame from webcam."

    try:
        analysis = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        detected_emotion = analysis[0]['dominant_emotion']
    except Exception as e:
        detected_emotion = "unknown"
    
    cap.release()
    return frame, detected_emotion
def game_round():
    return random.choice(emotions)
