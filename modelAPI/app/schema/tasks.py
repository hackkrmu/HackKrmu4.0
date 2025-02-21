from pydantic import BaseModel

class Task(BaseModel):
    id: int
    name: str
    skills: list
    time: str
    description: str
    quality: str
    status: str
