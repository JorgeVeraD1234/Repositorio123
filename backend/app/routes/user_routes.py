from flask import request, Blueprint
from app.controllers.user_controller import create_user, get_users

user_blueprint = Blueprint("users", __name__, url_prefix="/user")

@user_blueprint.route("/create", methods=["POST"])
def route_create_user():
    data = request.get_json()
    user = create_user(data)

    if isinstance(user, dict) and user.get("error"):
        return user, 400

    return {"msg": "Se ha creado con éxito el usuario", "user": user.to_dict()}, 201

@user_blueprint.route("/", methods=["GET"])
def get_all():
    users = get_users()
    return [user.to_dict() for user in users], 200