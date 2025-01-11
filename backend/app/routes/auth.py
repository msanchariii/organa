from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, schemas, utils
from typing import List
from ..utils.oauth2 import create_access_token


router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Hash the password
    hashed_password = utils.hash_password(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login")
def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.email).first()
    if not user:
        raise HTTPException(status_code=403, detail="Invalid Credentials")
    
    if not utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")
    
    access_token = create_access_token(data = {"user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer"}