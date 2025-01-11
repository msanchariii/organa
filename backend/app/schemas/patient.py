from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PatientBase(BaseModel):
    name: str
    blood_type: str
    organ_needed: str
    priority_status: int
    location: str
    medical_history: Optional[str] = None

class PatientCreate(PatientBase):
    hospital_id: int

class PatientOut(PatientBase):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class PatientUpdate(BaseModel):
    priority_status: Optional[int] = None
    status: Optional[str] = None
    medical_history: Optional[str] = None