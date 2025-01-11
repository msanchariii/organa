from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class OrganBase(BaseModel):
    type: str
    blood_type: str
    location: str
    status: str = "available"

class OrganCreate(OrganBase):
    hospital_id: int

class OrganOut(OrganBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class OrganUpdate(BaseModel):
    status: Optional[str] = None
    location: Optional[str] = None