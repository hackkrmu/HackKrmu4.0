from flask import Flask, request, jsonify, render_template
from transformers import pipeline
from pymongo import MongoClient
import mtranslate
import os
from flask_caching import Cache
import asyncio

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Load the classification model once
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

categories = ["Crimes against property", "Cybercrime", "Excessive use of tobacco, alcohol, and drugs",
              "Organized crime", "Other types of crime", "Murder", "Sexual violence", "Violent crimes",
              "Air pollution", "Biodiversity loss", "Deforestation", "Environmental degradation",
              "Light pollution", "Noise pollution", "Ocean acidification", "Overfishing", "Overpopulation",
              "Ozone depletion", "Water pollution", "Cancer", "Consumption of processed food", "Diabetes",
              "Expensive medical care", "Hypertension", "Mental health issues", "Reproductive health issues",
              "Stress", "Cloud", "Data infrastructure", "Energy", "Hard infrastructure", "Technological progress",
              "Telecommunications", "Dirty public restrooms", "Improper waste disposal", "Inadequate sanitation in areas",
              "Lack of handwashing facilities", "Overflowing trash cans", "Poor air quality in enclosed spaces",
              "Spitting in public", "Unhygienic public transportation", "Unmaintained public spaces"]

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db_map = {
    "crime": ["Crimes against property", "Cybercrime", "Excessive use of tobacco, alcohol, and drugs",
              "Organized crime", "Other types of crime", "Murder", "Sexual violence", "Violent crimes"],
    "environment": ["Air pollution", "Biodiversity loss", "Deforestation", "Environmental degradation",
                    "Light pollution", "Noise pollution", "Ocean acidification", "Overfishing",
                    "Overpopulation", "Ozone depletion", "Water pollution"],
    "health_issues": ["Cancer", "Consumption of processed food", "Diabetes", "Expensive medical care",
                       "Hypertension", "Mental health issues", "Reproductive health issues", "Stress"],
    "technology_&_infrastructure": ["Cloud", "Data infrastructure", "Energy", "Hard infrastructure",
                                     "Technological progress", "Telecommunications"],
    "cleanliness": ["Dirty public restrooms", "Improper waste disposal", "Inadequate sanitation in areas",
                    "Lack of handwashing facilities", "Overflowing trash cans",
                    "Poor air quality in enclosed spaces", "Spitting in public",
                    "Unhygienic public transportation", "Unmaintained public spaces"]
}

UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@cache.memoize(timeout=300)  # Cache the translation result for 5 minutes
def translate_text(text):
    """Translate text to English using mtranslate."""
    try:
        translated_text = mtranslate.translate(text, "en")
        print(f"Translated: {translated_text}")
        return translated_text
    except Exception as e:
        print(f"Translation Error: {e}")
        return text

def store_data(original_text, translated_text, category, files):
    """Stores data in MongoDB under the correct category."""
    try:
        for db_name, cat_list in db_map.items():
            if category in cat_list:
                db = client[db_name]
                collection = db[category]
                record = {
                    "original_text": original_text,
                    "translated_text": translated_text,
                    "category": category,
                    "files": [file for file in files]
                }
                collection.insert_one(record)
                print(f"Stored in database '{db_name}', collection '{category}': {original_text} (Translated: {translated_text})")
                return db_name
        print("Category not recognized!")
        return None
    except Exception as e:
        print(f"Database Error: {e}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
async def submit():
    try:
        data = request.form.get('text')
        if not data:
            return jsonify({"status": "error", "message": "No text provided"}), 400

        translated_text = translate_text(data)
        classification_result = await asyncio.to_thread(classifier, translated_text, candidate_labels=categories)
        category = classification_result["labels"][0]

        files = []
        for key, file in request.files.items():
            if file:
                file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
                await asyncio.to_thread(file.save, file_path)
                files.append(file.filename)

        db_name = store_data(data, translated_text, category, files)

        return jsonify({"status": "success", "category": category}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"status": "error", "message": "An error occurred while processing the request"}), 500

if __name__ == '__main__':
    app.run(debug=True)
