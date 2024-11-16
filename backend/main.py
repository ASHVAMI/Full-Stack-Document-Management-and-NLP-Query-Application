from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from app.core.config import settings
from app.api.v1.api import api_router
from app.db.session import engine
from app.db.base import Base

app = FastAPI(title=settings.PROJECT_NAME, version="1.0.0")

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/api/v1")

# Create database tables
Base.metadata.create_all(bind=engine)