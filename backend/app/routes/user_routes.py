from flask import Blueprint, request, jsonify
from ..controllers.user_controller import create_user, get_users

user_blueprint = Blueprint("users", __name__, url_prefix="/user")

@user_blueprint.route("/create", methods=["POST"])
def route_create_user():
    data = request.get_json()
    user = create_user(data)

    if isinstance(user, dict) and user.get("error"):
        return jsonify(user), 400

    # Convertimos el usuario recién creado a dict
    user_dict = {"id": user.id, "name": user.name, "email": user.email}
    return jsonify({"msg": "Se ha creado con éxito el usuario", "user": user_dict}), 201

@user_blueprint.route("/", methods=["GET"])
def get_all():
    users = get_users()  # get_users() ya devuelve lista de dicts
    return jsonify(users), 200