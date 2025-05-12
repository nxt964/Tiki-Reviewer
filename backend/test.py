from pymongo import MongoClient

import os 
from dotenv import load_dotenv

load_dotenv()

client = MongoClient(os.getenv("DB_URI"))
print(client.list_database_names())  # To confirm connection
