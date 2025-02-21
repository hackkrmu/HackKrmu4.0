from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return 'Welcome to my website!'

@app.route('/about')
def about():
    return 'This is the about page.'

@app.route('/contact')
def contact():
    return 'Contact us at example@example.com'

@app.route('/blog')
def blog():
    return 'Check out our latest blog posts.'

@app.route('/product/<int:product_id>')
def product(product_id):
    return f'This is product {product_id} page.'

@app.route('/category/<category_name>')
def category(category_name):
    return f'You are viewing category: {category_name}'

@app.route('/user/<username>')
def user(username):
    return f'Hello, {username}!'

@app.route('/services')
def services():
    return 'We offer a variety of services.'

@app.route('/portfolio')
def portfolio():
    return 'Explore our portfolio.'

@app.route('/faq')
def faq():
    return 'Frequently Asked Questions'

if __name__ == '__main__':
    app.run(debug=True)
