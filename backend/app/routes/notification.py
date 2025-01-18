from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..models.notification import Notification
from ..services.notifications import create_notification, send_realtime_notification

router = APIRouter()

@router.get("/notifications/{hospital_id}")
def get_notifications(hospital_id: int, db: Session = Depends(get_db)):
    """Fetch all notifications for a hospital."""
    return db.query(Notification).filter(Notification.hospital_id == hospital_id).all()

@router.post("/notifications/")
async def send_notification(hospital_id: int, message: str, db: Session = Depends(get_db)):
    """Create a notification and send it in real-time."""
    notification = create_notification(db, hospital_id, message)
    await send_realtime_notification(hospital_id, message)
    return {"message": "Notification sent", "data": notification}
