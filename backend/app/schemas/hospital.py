from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class HospitalBase(BaseModel):
    name: str
    location: str
    zip_code: int
    email: EmailStr
    phone_number: str
    total_beds: Optional[int] = None
    available_beds: Optional[int] = None
    departments: Optional[List[str]] = None

class HospitalCreate(HospitalBase):
    admin_id: int  # The user ID of the hospital administrator i.e. who created the hospital

class HospitalOut(HospitalBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class HospitalUpdate(BaseModel):
    name: Optional[str] = None
    location: Optional[str] = None
    zip_code: Optional[int] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    total_beds: Optional[int] = None
    available_beds: Optional[int] = None
    departments: Optional[List[str]] = None
