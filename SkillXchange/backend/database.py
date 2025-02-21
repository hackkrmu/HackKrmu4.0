from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app import app

app.config.from_object('config.Config')
db = SQLAlchemy(app)
migrate = Migrate(app, db)

def init_db(app):
    db.init_app(app)
    with app.app_context():
        db.create_all()
