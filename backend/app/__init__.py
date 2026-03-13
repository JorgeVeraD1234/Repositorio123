from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
from .database.db import db


jwt = JWTManager()
migrate = Migrate()




def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    
    from .models.user_model import User
    
    from .routes.user_routes import user_blueprint
    app.register_blueprint(user_blueprint)
    
    
    
    
    
    jwt.init_app(app)
    migrate.init_app(app, db)
    db.init_app(app)
    
    CORS(app)
    return app




