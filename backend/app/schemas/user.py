from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime  # ✅ Import added

class UserBase(BaseModel):
    email: EmailStr
    hospital_name: str
    role: str

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    created_at: datetime  

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
