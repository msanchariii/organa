from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    blood_type = Column(String)
    organ_needed = Column(String)
    priority_status = Column(Integer)  # 1-10
    hospital_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)  # waiting, matched, transplanted
    location = Column(String)
    medical_history = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())