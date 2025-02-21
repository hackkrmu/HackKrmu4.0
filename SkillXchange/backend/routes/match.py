from flask import Blueprint, request, jsonify
from models import User

match = Blueprint('match', __name__)

@match.route('/match', methods=['GET'])
def match_skills():
    users = User.query.all()
    # Implement skill matching logic here
    return jsonify({"message": "Skill matching logic not implemented yet!"})