import os
from dotenv import load_dotenv

load_dotenv()

# backend/app/config.py
class Config:
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:TfjOAypcGyngOQbUVmsNFozjmqyYxaVp@postgres.railway.internal:5432/railway"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "algo_seguro"
    JWT_SECRET_KEY = "algo_seguro"