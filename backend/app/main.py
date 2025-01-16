from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import auth, organs, patients, matching, hospital
# from . import models
from .models import Base
from .database import engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/") 
async def root():
    return {"message": "Hello World"}

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(patients.router, prefix="/api/patients", tags=["Patients"])
app.include_router(matching.router, prefix="/api/matching", tags=["Matching"])
app.include_router(organs.router, prefix="/api/organs", tags=["Organs"])
app.include_router(hospital.router, prefix="/api/hospitals", tags=["Hospitals"])
