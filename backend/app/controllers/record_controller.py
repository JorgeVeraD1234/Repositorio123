from app.database.db import db
from ..models.record_model import Record



def create_record(data):  
    name = data.get("name")
    description = data.get("description")
    if not name or not description:
        return {"error":"No se pudo crear el registro por la falta de datos"}, 400
    new_record = Record(name=name, description=description, user_id=data.get("user_id"))
    db.session.add(new_record)
    db.session.commit()
    return {"msg": "Se creo el registro con exito"}, 200



def get_records():
    records = Record.query.all()
    if not records:
        return {"error":"no hay registros"}, 400
    return [record.to_dict() for record in records], 200
