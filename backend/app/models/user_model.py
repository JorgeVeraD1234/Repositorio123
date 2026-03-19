from ..database.db import db  # <-- la misma instancia que init_app()
from app.models.record_model import Record

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), nullable=False, unique=True)
    password = db.Column(db.String(500), nullable=False)
    
    
    records = db.relationship("Record", backref="user", lazy=True)


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }