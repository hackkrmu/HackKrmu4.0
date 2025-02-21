from flask import Blueprint, request, jsonify
from models import User
from database import db

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"message": "Login successful!"})
    return jsonify({"message": "Invalid credentials!"}), 401

@auth.route('/register', methods=['POST'])
def register():
    data = request.json
    new_user = User(name=data['name'], email=data['email'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"})