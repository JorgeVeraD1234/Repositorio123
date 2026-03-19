from flask import Blueprint, request
from ..controllers.record_controller import create_record, get_records

record_blueprint = Blueprint("records", __name__, url_prefix="/record")


@record_blueprint.route("/create", methods=["POST"])
def r_create_record():
    data = request.get_json()
    return create_record(data)


@record_blueprint.route("/", methods=["GET"])
def r_get_records():
    return get_records()