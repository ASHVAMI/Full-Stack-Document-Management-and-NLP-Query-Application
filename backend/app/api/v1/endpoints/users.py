from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.auth import get_current_user, get_password_hash
from app.db.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate, User as UserSchema

router = APIRouter()

@router.post("/", response_model=UserSchema)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user = User(
        email=user.email,
        hashed_password=get_password_hash(user.password),
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/me", response_model=UserSchema)
def read_current_user(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserSchema)
def update_current_user(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if user_update.password:
        current_user.hashed_password = get_password_hash(user_update.password)
    db.commit()
    db.refresh(current_user)
    return current_user