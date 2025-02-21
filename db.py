# db.py
import mysql.connector

class Database:
    def __init__(self, db_config):
        self.db_config = db_config

    def connect(self):
        return mysql.connector.connect(**self.db_config)

    def get_incident_by_id(self, incident_id):
        conn = self.connect()
        cursor = conn.cursor(dictionary=True)
        
        query = "SELECT * FROM incidents WHERE id = %s"
        cursor.execute(query, (incident_id,))
        incident = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        return incident

    def get_incidents(self):
        conn = self.connect()
        cursor = conn.cursor(dictionary=True)
        
        cursor.execute("SELECT id, severity FROM incidents")
        incidents = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        return incidents