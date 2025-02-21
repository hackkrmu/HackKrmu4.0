from flask import Flask, request, jsonify
from sympy import sympify, solve

app = Flask(__name__)

@app.route('/solve', methods=['POST'])
def solve_equation():
    equation = request.json['equation']
    try:
        expr = sympify(equation)
        solutions = solve(expr)
        return jsonify({'solutions': [str(sol) for sol in solutions]})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(port=5002)