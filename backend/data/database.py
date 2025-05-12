import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Database:
    def __init__(self):
        uri = os.getenv("DB_URI")
        if not uri:
            raise ValueError("DB_URI is not set in the environment variables.")
        
        db_name = os.getenv("DB_NAME")
        if not db_name:
            raise ValueError("DB_NAME is not set in the environment variables.")
        
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_database(self):
        return self.db

    def close_connection(self):
        self.client.close()
