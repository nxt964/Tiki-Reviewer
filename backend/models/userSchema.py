from werkzeug.security import generate_password_hash
import re
from werkzeug.security import check_password_hash

# Email validation function
def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_regex, email)

class UserSchema:
    def __init__(self, db=None):
        self.collection = db['users'] if db else None
        if not self.collection:
            raise ValueError("Database collection could not be initialized.")

    def create_user(self, email, password, name):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")

        # Check if email and password are provided
        if not email or not password:
            raise ValueError("Email and password are required.")
        
        # check if email is valid
        if not is_valid_email(email):
            raise ValueError("Invalid email format")
        
        # Check if the user already exists
        if self.collection.find_one({"email": email}):
            raise ValueError("Email already exists")

        # Hash password
        hashed_password = generate_password_hash(password)

        # Create user document
        user = {
            "email": email,
            "password": hashed_password,
            "name": name
        }
        inserted = self.collection.insert_one(user)
        user["_id"] = inserted.inserted_id  # Include ObjectID in response
        return user

    def find_user(self, email, password):
        if self.collection is None:
            raise ValueError("Database collection not initialized.")
        
        # Check if email and password are provided
        if not email or not password:
            raise ValueError("Email and password are required.")
        
        # Check if email is valid
        if not is_valid_email(email):
            raise ValueError("Invalid email format")
        
        # Fetch user by email
        user = self.collection.find_one({"email": email})
        if not user:
            raise ValueError("User not found")
        
        # Check if password is correct
        if not check_password_hash(user["password"], password):
            raise ValueError("Incorrect password")
        
        return user
