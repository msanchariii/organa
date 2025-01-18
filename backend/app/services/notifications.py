from fastapi import APIRouter, Depends, WebSocket
from sqlalchemy.orm import Session
from database import get_db
from models import Organ, Patient, Notification
import json

router = APIRouter()

# Matching function
def find_match(db: Session, organ=None, patient=None):
    if organ:
        potential_patients = db.query(Patient).filter(
            Patient.organ_needed == organ.type,
            Patient.blood_type == organ.blood_type
        ).all()
        for patient in potential_patients:
            send_notification(db, patient.hospital_id, f"Organ match found for {patient.name}!")
    
    elif patient:
        potential_organs = db.query(Organ).filter(
            Organ.type == patient.organ_needed,
            Organ.blood_type == patient.blood_type
        ).all()
        for organ in potential_organs:
            send_notification(db, organ.hospital_id, f"Patient match found for {organ.type}!")

# Function to send notification
def send_notification(db: Session, hospital_id: int, message: str):
    notification = Notification(message=message, hospital_id=hospital_id)
    db.add(notification)
    db.commit()
    db.refresh(notification)
    return notification
