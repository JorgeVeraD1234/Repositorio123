from app import db



class User(db.Model):
    __tablename__ = "users"
    
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    email = db.Column(db.String(120), nullable = False, unique = True)
    password = db.Column(db.String(500), nullable = False)
    
    
    
    def to_dict(self):
        user = {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }
        return user














