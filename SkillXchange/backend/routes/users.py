from flask import Blueprint, request, jsonify
from models import User

users = Blueprint('users', __name__)

@users.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([{"id": user.id, "name": user.name, "email": user.email} for user in users])