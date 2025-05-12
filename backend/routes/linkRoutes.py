from flask import Blueprint, request, jsonify
from utils.appError import AppError
from data.database import Database
from bson import ObjectId

from controllers.linkController import LinkController

linkRoutes = Blueprint('linkRoutes', __name__)

# Create a database instance
db_instance = Database()
db = db_instance.get_database()

@linkRoutes.route('/add', methods=['POST'])
def add_link():
    try:
        data = request.get_json()
        return LinkController.add_link(data, db)
    except AppError as e:
        return jsonify({"error": str(e)}), e.status_code
    except Exception as e:
        return jsonify({"error": "Internal Server Error", 
                        "message": str(e)}), 500

@linkRoutes.route('/get/<user_id>', methods=['GET'])
def get_links(user_id):
    try:
        # Validate the provided user_id
        if not ObjectId.is_valid(user_id):
            raise AppError("Invalid user ID format.", 400)
        return LinkController.get_links({"user_id": user_id}, db)
    except AppError as e:
        return jsonify({"error": str(e)}), e.status_code
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500
