from flask import Flask, render_template, request, jsonify, redirect, url_for
from flask_mysqldb import MySQL
import bcrypt

app = Flask(__name__)


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_username'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DB'] = 'farmfolio_db'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cur.fetchone()
    cur.close()
    
    if user:
        stored_password = user['password'].encode('utf-8')
        if bcrypt.checkpw(password.encode('utf-8'), stored_password):

            return jsonify({'redirect_url': url_for('home')})
    
    return jsonify({'message': 'Invalid username or password'})

@app.route('/home')
def home():

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
