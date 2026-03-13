from app import db
from app.models.user_model import User
from werkzeug.security import check_password_hash, generate_password_hash


def create_user(data):
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    if not name or not email or not password:
        return {"error":"Faltan datos"}
    
    if User.query.filter_by(email=email).first():
        return {"error":"El email ya esta asociado a una cuenta"}
    
    
    hashed_password = generate_password_hash(password)
    new_user = User(name = name, email = email, password = hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return new_user





def get_users():
    return User.query.filter().all()




























