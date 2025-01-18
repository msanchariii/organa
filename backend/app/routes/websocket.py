from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from ..config import SECRET_KEY, ALGORITHM  # Ensure you have SECRET_KEY & ALGORITHM
from ..models import User
from ..database import get_db

router = APIRouter()

async def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("user_id")
        if user_id is None:
            return None
        user = db.query(User).filter(User.id == user_id).first()
        return user
    except JWTError:
        return None

@router.websocket("/ws/{hospital_id}")
async def websocket_endpoint(websocket: WebSocket, hospital_id: int, token: str, db: Session = Depends(get_db)):
    user = await get_current_user(token, db)
    if not user:
        await websocket.close(code=403)
        return
    if user.hospital_id != hospital_id:
        await websocket.close(code=403)
        return

    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Message received: {data}")
    except WebSocketDisconnect:
        print("Client disconnected")
