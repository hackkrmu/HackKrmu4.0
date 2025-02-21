from flask import Flask, render_template, request, jsonify, flash, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import os
import cv2
import mediapipe as mp
import tensorflow as tf
import numpy as np
import spacy
import speech_recognition as sr
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SECRET_KEY'] = os.urandom(24)  # Consider using a fixed key in production
app.config['GIF_FOLDER'] = 'static/gifs'
app.config['UPLOAD_FOLDER'] = 'static/images'
app.config['VIDEO_FOLDER'] = 'static/c1_video'

db = SQLAlchemy(app)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

#######################################################
nlp = spacy.load("en_core_web_sm")

@app.route('/process', methods=['POST'])
def process_text():
    text = request.json.get('text')
    doc = nlp(text)
    tokens = [token.text for token in doc]
    return jsonify(tokens=tokens)
# ---------------------- Page Routes ----------------------

@app.route('/')
def first():
    return render_template('first.html')

@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/model')
def model():
    return render_template('slider_3d/index.html')

@app.route('/sign_to_text')
def sign_to_text():
    return render_template('sign_to_text.html')

@app.route('/text_to_sign')
def text_to_sign():
    return render_template('text_to_sign.html')

@app.route('/choose_model')
def choose_model():
    return render_template('choose_model.html')

@app.route('/characters')
def characters():
    return render_template('character1/index.html')

@app.route('/character2')
def Character2():
    return render_template('character2.html')

@app.route('/character3')
def Character3():
    return render_template('character3/index.html')

@app.route('/character4')
def Character4():
    return render_template('character4.html')

@app.route('/character5')
def Character5():
    return render_template('character5.html')

@app.route('/character6')
def Character6():
    return render_template('character6.html')

@app.route('/character7')
def Character7():
    return render_template('character7.html')

@app.route('/slide_navbar')
def slide_navbar():
    return render_template('slide_navbar.html')

# User Authentication Routes
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid credentials', 'error')
            return redirect(url_for('login'))
    
    return render_template('user_login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password, method='sha256')

        new_user = User(email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        
        flash('Account created successfully!', 'success')
        return redirect(url_for('login'))
    
    return render_template('user_signup.html')

# ---------------------- API Routes ----------------------

@app.route('/convert_text', methods=['POST'])
def convert_text():
    text = request.form['text'].lower()
    images = []

    words = text.split()
    for word in words:
        gif_path = os.path.join(app.config['GIF_FOLDER'], f'{word}.gif')
        if os.path.exists(gif_path):
            images.append(f'gifs/{word}.gif')
        else:
            for char in word:
                if char.isalpha():
                    image_path = os.path.join(app.config['UPLOAD_FOLDER'], f'{char}.jpg')
                    if os.path.exists(image_path):
                        images.append(f'images/{char}.jpg')

    return render_template('result.html', images=images)

@app.route('/convert_speech', methods=['POST'])
def convert_speech():
    file = request.files['file']
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    recognizer = sr.Recognizer()
    audio = sr.AudioFile(file_path)
    
    with audio as source:
        audio_data = recognizer.record(source)
        
    try:
        text = recognizer.recognize_google(audio_data)
    except sr.UnknownValueError:
        text = "Could not understand audio"
    except sr.RequestError:
        text = "Could not request results"

    os.remove(file_path)  # Clean up the uploaded file
    return jsonify({'text': text})

# API for text-to-sign conversion
@app.route('/text-to-sign', methods=['POST'])
def text_to_sign_api():
    data = request.json
    text = data.get('text', '')

    if not text:
        return jsonify({'error': 'No text provided'}), 400

    sign_images = [f"images/{char}.jpg" for char in text.lower() if char.isalpha()]

    return jsonify({'sign_images': sign_images})

# API for sign-to-text conversion
@app.route('/sign-to-text', methods=['POST'])
def sign_to_text_api():
    file = request.files.get('image')

    if not file:
        return jsonify({'error': 'No image provided'}), 400

    # Here, implement hand gesture recognition using OpenCV or ML model
    recognized_text = "hello"  # Example output, replace with actual recognition logic

    return jsonify({'recognized_text': recognized_text})

@app.route('/convert_textc1', methods=['POST'])
def convert_text_c1():
    text = request.form.get('text', '').lower().strip()  # Handle missing text input
    video_files = []  # Ensure it's always initialized

    if text:
        words = text.split()  # Split text into words

        for word in words:
            # Check if full word exists as an .mp4 file
            word_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{word}.mp4")
            if os.path.exists(word_video_path):
                video_files.append(f'c1_video/{word}.mp4')  # Store the relative path
            else:
                # If the word doesn't exist, check for each letter
                for char in word:
                    char_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{char}.mp4")
                    if os.path.exists(char_video_path):
                        video_files.append(f'c1_video/{char}.mp4')

    return render_template('result1.html', videos=video_files)  # Ensure 'videos' is always passed

##########################################################
@app.route('/convert_textc2', methods=['POST'])
def convert_text_c2():
    text = request.form.get('text', '').lower().strip()  # Handle missing text input
    video_files = []  # Ensure it's always initialized

    if text:
        words = text.split()  # Split text into words

        for word in words:
            # Check if full word exists as an .mp4 file
            word_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{word}.mp4")
            if os.path.exists(word_video_path):
                video_files.append(f'c2_video/{word}.mp4')  # Store the relative path
            else:
                # If the word doesn't exist, check for each letter
                for char in word:
                    char_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{char}.mp4")
                    if os.path.exists(char_video_path):
                        video_files.append(f'c2_video/{char}.mp4')

    return render_template('result2.html', videos=video_files)  # Ensure 'videos' is always passed
########################################

##########################################################
@app.route('/convert_textc4', methods=['POST'])
def convert_text_c4():
    text = request.form.get('text', '').lower().strip()  # Handle missing text input
    video_files = []  # Ensure it's always initialized

    if text:
        words = text.split()  # Split text into words

        for word in words:
            # Check if full word exists as an .mp4 file
            word_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{word}.mp4")
            if os.path.exists(word_video_path):
                video_files.append(f'c2_video/{word}.mp4')  # Store the relative path
            else:
                # If the word doesn't exist, check for each letter
                for char in word:
                    char_video_path = os.path.join(app.config['VIDEO_FOLDER'], f"{char}.mp4")
                    if os.path.exists(char_video_path):
                        video_files.append(f'c2_video/{char}.mp4')

    return render_template('result4.html', videos=video_files)  # Ensure 'videos' is always passed
########################################

if __name__ == '__main__':
    app.run(debug=True)
