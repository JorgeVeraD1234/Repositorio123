from ..database.db import db
from ..models.user_model import User
from werkzeug.security import generate_password_hash

def create_user(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return {"error": "Faltan datos"}

    if User.query.filter_by(email=email).first():
        return {"error": "El email ya está asociado a una cuenta"}

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()

    return new_user

def get_users():
    users = User.query.all()
    # Convertimos cada objeto User a un diccionario
    return [{"id": u.id, "name": u.name, "email": u.email} for u in users]