from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime  # ✅ Import added

class UserBase(BaseModel):
    email: EmailStr
    # role: str
    staff_id: str
    
class UserCreate(UserBase):
    password: str
    
class UserLogin(BaseModel):
    hospital_id: int
    staff_id: str
    password: str
    
class UserOut(UserBase):
    id: int
    hospital_id: Optional[int]
    created_at: datetime  # ✅ Field added
