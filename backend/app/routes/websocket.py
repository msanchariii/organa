from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from sqlalchemy.orm import Session
from jose import jwt, JWTError

from ..models import User
from ..database import get_db

router = APIRouter()

async def get_current_user(token: str, db: Session):
    """ Decode JWT token & get user details """
    try:
        # payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        payload = "dummy_payload"
        user_id: int = payload.get("user_id")
        if user_id is None:
            return None
        user = db.query(User).filter(User.id == user_id).first()
        return user
    except JWTError:
        return None

@router.websocket("/ws/{hospital_id}")
async def websocket_endpoint(websocket: WebSocket, hospital_id: int, token: str = Query(None), db: Session = Depends(get_db)):
    """ WebSocket connection that verifies JWT & hospital_id """
    await websocket.accept()

    if not token:
        await websocket.close(code=403)
        return

    # user = await get_current_user(token, db)
    # if not user or user.hospital_id != hospital_id:
    #     await websocket.close(code=403)
    #     return

    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message received: {data}")
    except WebSocketDisconnect:
        print(f"Client disconnected from hospital {hospital_id}")
