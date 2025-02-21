import json
import os
from datetime import datetime

# Directory to store raw images
RAW_IMAGES_DIR = "raw_images"
DATA_JSON_FILE = "data.json"

# Ensure directory exists
os.makedirs(RAW_IMAGES_DIR, exist_ok=True)

# Initialize data.json if not exists
if not os.path.exists(DATA_JSON_FILE):
    with open(DATA_JSON_FILE, "w") as f:
        json.dump({"records": []}, f, indent=4)

def save_raw_image(file_name, image_data):
    """Saves raw image received from frontend into raw_images directory."""
    file_path = os.path.join(RAW_IMAGES_DIR, file_name)
    with open(file_path, "wb") as f:
        f.write(image_data)
    return file_path

def add_record(record):
    """Adds a processed record to data.json."""
    with open(DATA_JSON_FILE, "r") as f:
        db = json.load(f)
    
    record["timestamp"] = datetime.now().isoformat()
    db["records"].append(record)
    
    with open(DATA_JSON_FILE, "w") as f:
        json.dump(db, f, indent=4)

def get_data():
    """Returns all records from data.json."""
    with open(DATA_JSON_FILE, "r") as f:
        return json.load(f)

# Example Usage
if __name__ == "__main__":
    # Example raw image from frontend (binary data)
    with open("example.jpg", "rb") as img_file:
        raw_image_data = img_file.read()
    
    raw_file_path = save_raw_image("sample1.jpg", raw_image_data)
    
    # Processed data to be stored in data.json
    processed_record = {"id": 1, "waste_type": "plastic", "image_path": raw_file_path, "location": "28.7041, 77.1025"}
    add_record(processed_record)
    
    # Fetch all records
    print(get_data())