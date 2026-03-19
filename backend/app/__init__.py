# backend/app/__init__.py
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .config import Config
from .database.db import db
from app.models.user_model import User
from app.models.record_model import Record

jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # inicializar extensiones primero
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    # luego importar modelos y rutas
    from .routes.user_routes import user_blueprint
    from .routes.record_routes import record_blueprint


    app.register_blueprint(user_blueprint)
    app.register_blueprint(record_blueprint)


    return app
