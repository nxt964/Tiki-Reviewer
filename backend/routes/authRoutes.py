from flask import Blueprint, request, jsonify
from controllers.authController import AuthController
from data.database import Database
from utils.appError import AppError

authRoutes = Blueprint('authRoutes', __name__)

# Create a database instance
db_instance = Database()
db = db_instance.get_database()

@authRoutes.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        return AuthController.signup(data, db)
    except AppError as e:
        return jsonify({"error": str(e)}), e.status_code
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500

@authRoutes.route('/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
        return AuthController.signin(data, db)
    except AppError as e:
        return jsonify({"error": str(e)}), e.status_code
    except Exception as e:
        return jsonify({"error": "Internal Server Error", "message": str(e)}), 500



