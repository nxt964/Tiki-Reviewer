import re
from urllib.parse import urlparse
from utils.appError import AppError
from models.userSchema import UserSchema
from flask import jsonify
from werkzeug.security import check_password_hash

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

class AuthController:
    @staticmethod
    def signup(data, db):
        # Initialize UserSchema with the database
        user_model = UserSchema(db)

        email = data.get("email")
        password = data.get("password")
        name = data.get("name")

        # Validate email format
        if not is_valid_email(email):
            raise AppError("Invalid email format.", 400)

    
        # Create the user using UserSchema
        try:
            user_model.create_user(email, password, name)
        except ValueError as e:
            raise AppError(str(e), 400)
        except AppError as e:
            return jsonify(e.to_dict()), e.status_code
        
        # Return success response
        return jsonify({
            "status": "success",
            "message": "User signed up successfully!"
        }), 201


    @staticmethod
    def signin(data, db):
        # Initialize UserSchema with the database
        user_model = UserSchema(db)

        email = data.get("email")
        password = data.get("password")

        # Validate email and password presence
        if not email or not password:
            raise AppError("Email and password are required.", 400)

        # Validate email format
        if not is_valid_email(email):
            raise AppError("Invalid email format.", 400)

        # Find the user in the database
        user = user_model.find_user(email, password)
        if not user:
            raise AppError("Invalid credentials: User not found.", 401)

        # Check if the provided password matches the stored hash
        if not check_password_hash(user["password"], password):
            raise AppError("Invalid credentials: Incorrect password.", 401)

        # Return success response
        return jsonify({
            "status": "success",
            "message": "Sign-in successful!",
            "data": {
                "id": str(user["_id"]),
                "email": user["email"],
                "name": user["name"]
            }
        }), 200