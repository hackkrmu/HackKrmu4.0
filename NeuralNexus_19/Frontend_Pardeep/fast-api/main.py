from fastapi import FastAPI
from pydantic import BaseModel
import sqlite3
import pymysql

app = FastAPI()

sqlite_conn = sqlite3.connect("agrinexus.db", check_same_thread=False)
sqlite_cursor = sqlite_conn.cursor()
sqlite_cursor.execute("CREATE TABLE IF NOT EXISTS crops (id INTEGER PRIMARY KEY, name TEXT, disease TEXT, treatment TEXT)")
sqlite_conn.commit()

try:
    mysql_conn = pymysql.connect(
        host="localhost",
        user="root",
        password="12345678",
        database="agrinexus_db"
    )
    mysql_cursor = mysql_conn.cursor()
    print("Successfully connected to MySQL database")
except Exception as e:
    print("MySQL Connection Error:", e)
    mysql_conn = None 

class CropData(BaseModel):
    name: str
    disease: str
    treatment: str

@app.get("/")
def home():
    return {"message": "Welcome to AgriNexus API"}

@app.post("/add_crop/")
def add_crop(data: CropData):
    sqlite_cursor.execute("INSERT INTO crops (name, disease, treatment) VALUES (?, ?, ?)", 
                           (data.name, data.disease, data.treatment))
    sqlite_conn.commit()
    return {"status": "Crop added successfully"}

@app.get("/get_crops/")
def get_crops():
    sqlite_cursor.execute("SELECT * FROM crops")
    crops = sqlite_cursor.fetchall()

    crop_list = [{"id": row[0], "name": row[1], "disease": row[2], "treatment": row[3]} for row in crops]
    
    return {"data": crop_list}
