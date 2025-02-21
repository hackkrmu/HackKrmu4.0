from database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    skills = db.Column(db.String(200), nullable=True)
    learning_goals = db.Column(db.String(200), nullable=True)