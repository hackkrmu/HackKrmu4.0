from pydantic import BaseModel
from typing import Dict

class User(BaseModel):
    id: int
    name: str
    email: str
    password: str
    linkedIn: str
    joiningDate: str
    skills: list
    expertise: list
    feedback: float
    goals: list
    profile_pic: str
    role: str
    expeirence: int
    phone_no: int
    scheduel: Dict[str, Dict[str, str]] 

class CreateUser(BaseModel):
    id: int
    name: str
    email: str
    password: str
    linkedIn: str
    joiningDate: str
    skills: list
    expertise: list
    feedback: float
    goals: list
    profile_pic: str
    role: str
    expeirence: int
    phone_no: int
 
