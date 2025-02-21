import streamlit as st
import time
import cv2
from backend import capture_and_detect_emotion, game_round
score = 0
def start_timer(seconds):
    for i in range(seconds, 0, -1):
        st.write(f"Time left: {i} seconds")
        time.sleep(1)
def game_round_logic():
    global score
    target_emotion = game_round()
    st.write(f"Your task: Make a {target_emotion} face!")
    st.write("Get ready!")
    start_timer(5)  
    cap = cv2.VideoCapture(0)

    if not cap.isOpened():
        st.write("Error: Unable to access the webcam. Please ensure your camera is not being used by another application.")
        return

    stframe = st.empty()
    start_time = time.time()
    while time.time() - start_time < 5:
        ret, frame = cap.read()
        if not ret:
            st.write("Error accessing webcam.")
            break

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        stframe.image(frame_rgb, channels="RGB", use_container_width=True)

    frame, detected_emotion = capture_and_detect_emotion()

    if frame is None:
        st.write("Error capturing or detecting emotion. Please check webcam permissions.")
        cap.release()
        return

    if detected_emotion.lower() == target_emotion.lower():
        st.write("Correct! You earned 100 points!")
        score += 100
    else:
        st.write(f"Incorrect! The detected emotion was {detected_emotion}.")

    st.write(f"Current Score: {score}")

    cap.release()
st.title("Emotion Mimic Game")
if 'game_started' not in st.session_state:
    st.session_state.game_started = False

if st.session_state.game_started:
    start_game = st.button("Start Game", key="start_game_button")
    reset_game = st.button("Reset Game", key="reset_game_button")
    
    if start_game:
        game_round_logic()

    if reset_game:
        st.session_state.game_started = False
        score = 0
        st.write("Game Reset! You can start a new game.")

else:
    start_game = st.button("Start Game", key="start_game_button")

    if start_game:
        st.session_state.game_started = True
        score = 0
        st.write("Game Started! Mimic the emotion and earn points.")
        game_round_logic()

