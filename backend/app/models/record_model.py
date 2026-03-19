from app.database.db import db  # <-- la misma instancia que init_app()



class Record(db.Model):
    __tablename__="records"
    
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(120), nullable = False)
    description = db.Column(db.String(1000), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id   # 🔥 AGREGAR ESTO
        }