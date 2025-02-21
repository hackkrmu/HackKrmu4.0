import streamlit as st
import cv2
import time
import numpy as np
import pyttsx3
import speech_recognition as sr
from tensorflow.keras.models import load_model
import os

# Constants
SEQUENCE_LENGTH = 30  # Number of frames per sequence
IMAGE_HEIGHT, IMAGE_WIDTH = 64, 64  # Resizing dimensions
CLASSES_LIST = ["Namaste", "Good Afternoon", "Good Night", "How are you"]  # Replace with your class names
DATA_FOLDER = "data"  # Folder containing sign videos

# Load your pre-trained LRCN model
LRCN_model = load_model("LRCN_model.h5")  # Replace with your model path

# Function to predict action
def predict_single_action(frames_list):
    '''
    This function will perform single action recognition prediction on a sequence of frames.
    Args:
    frames_list: A list of pre-processed frames to be passed to the model.
    '''
    # Expand dimensions to match model input shape
    frames_array = np.expand_dims(frames_list, axis=0)

    # Predict probabilities
    predicted_labels_probabilities = LRCN_model.predict(frames_array)[0]

    # Get the index of the class with the highest probability
    predicted_label = np.argmax(predicted_labels_probabilities)

    # Get the class name using the retrieved index
    predicted_class_name = CLASSES_LIST[predicted_label]

    # Return the predicted class name and confidence
    return predicted_class_name, predicted_labels_probabilities[predicted_label]

# Text-to-speech function
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

# Speech-to-text function
def recognize_speech():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        st.write("Listening...")
        audio = recognizer.listen(source)
        try:
            text = recognizer.recognize_google(audio)
            st.write(f"You said: {text}")
            return text
        except sr.UnknownValueError:
            st.write("Sorry, I could not understand the audio.")
            return None
        except sr.RequestError:
            st.write("Sorry, the service is down.")
            return None

# Function to display sign video
def display_sign_video(sign_text):
    video_path = os.path.join(DATA_FOLDER, f"{sign_text}.mp4")
    if os.path.exists(video_path):
        return video_path
    else:
        st.write(f"No video found for {sign_text}")
        return None

# Streamlit app
st.title("Live Video Action Recognition")

# Mode selection
mode = st.radio("Select Mode", ("Sign to Speech", "Speech to Sign"))

if mode == "Sign to Speech":
    # Start video capture
    cap = cv2.VideoCapture(0)  # Use 0 for webcam

    if not cap.isOpened():
        st.error("Unable to access the camera.")
    else:
        st.write("Camera is ready. Click 'Start' to begin prediction.")

        if st.button("Start"):
            st.write("Recording and predicting every 4 seconds...")
            frame_placeholder = st.empty()
            timer_placeholder = st.empty()
            prediction_placeholder = st.empty()

            # Initialize variables
            frames_list = []
            start_time = time.time()

            while True:
                ret, frame = cap.read()
                if not ret:
                    st.error("Failed to capture video.")
                    break

                # Display the frame
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame_placeholder.image(frame, channels="RGB")

                # Show the timer
                elapsed_time = time.time() - start_time
                timer_placeholder.write(f"Time elapsed: {int(elapsed_time)} seconds")

                # Preprocess the frame
                resized_frame = cv2.resize(frame, (IMAGE_HEIGHT, IMAGE_WIDTH))
                normalized_frame = resized_frame / 255
                frames_list.append(normalized_frame)

                # Check if 4 seconds have passed
                if elapsed_time >= 4:
                    # Ensure we have exactly SEQUENCE_LENGTH frames
                    if len(frames_list) >= SEQUENCE_LENGTH:
                        # Predict on the last SEQUENCE_LENGTH frames
                        predicted_class_name, confidence = predict_single_action(frames_list[-SEQUENCE_LENGTH:])
                        prediction_placeholder.write(f"Action Predicted: {predicted_class_name}\nConfidence: {confidence:.2f}")

                        # Speak the prediction
                        speak(f"Predicted action is {predicted_class_name} with confidence {confidence:.2f}")

                    # Reset the timer and frames list
                    start_time = time.time()
                    frames_list = []

            cap.release()

    # Stop the app
    if st.button("Stop"):
        cap.release()
        st.write("Stopped recording.")

elif mode == "Speech to Sign":
    st.write("Click 'Start' to begin speech recognition.")
    if st.button("Start"):
        current_video = None
        video_display = st.empty()

        while True:
            text = recognize_speech()
            if text:
                video_path = display_sign_video(text)
                if video_path:
                    current_video = video_path

                if current_video:
                    # Display the video in a loop
                    while True:
                        video_display.video(current_video, format="video/mp4", loop=True)
                        # Check for new speech input
                        new_text = recognize_speech()
                        if new_text:
                            text = new_text
                break