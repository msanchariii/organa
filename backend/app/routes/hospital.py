from fastapi import APIRouter, Depends, HTTPException, status


router = APIRouter()

@router.get("/")
def get_hospitals():
    return {"message": "Get all hospitals"}

@router.get("/{hospital_id}")
def get_hospital(hospital_id: int):
    return {"message": f"Get hospital with ID {hospital_id}"}

@router.post("/")
def create_hospital():
    return {"message": "Create a new hospital"}