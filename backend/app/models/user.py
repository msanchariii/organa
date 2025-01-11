from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)  # hospital_staff, admin
    hospital_name = Column(String)
    staff_id = Column(String) # hospital staff id
    created_at = Column(DateTime(timezone=True), server_default=func.now())