from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from ..database import Base

class Organ(Base):
    __tablename__ = "organs"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String)  # heart, kidney, etc
    blood_type = Column(String)
    hospital_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)  # available, in_transit, transplanted
    location = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())