from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, func
from sqlalchemy.orm import relationship
from ..database import Base

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String, nullable=False)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    timestamp = Column(DateTime, default=func.now())
    # seen = Column(Boolean, default=False)