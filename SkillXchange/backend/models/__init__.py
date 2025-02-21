from flask import Blueprint, request, jsonify
from database import db
from models import User

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return jsonify({"message": "SkillXchange API is running!"})

@main.route('/register', methods=['POST'])
def register_user():
    data = request.json
    new_user = User(name=data['name'], email=data['email'], skills=data.get('skills', ''), learning_goals=data.get('learning_goals', ''))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"})

@main.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "name": user.name, "email": user.email, "skills": user.skills, "learning_goals": user.learning_goals} for user in users])

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    skills = db.Column(db.String(255), nullable=True)
    learning_goals = db.Column(db.String(255), nullable=True)

    def __init__(self, name, email, skills, learning_goals):
        self.name = name
        self.email = email
        self.skills = skills
        self.learning_goals = learning_goals
