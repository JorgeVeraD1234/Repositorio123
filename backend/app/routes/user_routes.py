from flask import request, Blueprint
from app.controllers.user_controller import create_user, get_users

user_blueprint = Blueprint("users", __name__, url_prefix="/user")



@user_blueprint.route("/create", methods = ["POST"])
def route_create_useer():
    data = request.get_json()
    user = create_user(data)
    
    if not user:
        return {"error":"no se pudo crear el usuario"}
    return {"msg":"Se ha creado con exito el usuario"}





@user_blueprint.route("/get-all", methods=["GET"])
def get_all():
    users = get_users()
    
    return [user.to_dict() for user in users]









