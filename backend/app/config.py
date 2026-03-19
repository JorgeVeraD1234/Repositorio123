import os
from dotenv import load_dotenv

load_dotenv()

# backend/app/config.py
""" 
"postgresql://postgres:TfjOAypcGyngOQbUVmsNFozjmqyYxaVp@switchback.proxy.rlwy.net:58066/railway"

"""
class Config:
    SQLALCHEMY_DATABASE_URI ="postgresql://postgres:TfjOAypcGyngOQbUVmsNFozjmqyYxaVp@switchback.proxy.rlwy.net:58066/railway"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "algo_seguro"
    JWT_SECRET_KEY = "algo_seguro"