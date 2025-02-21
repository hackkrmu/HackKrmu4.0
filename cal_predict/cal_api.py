import pickle
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel

# Initialize FastAPI app
app = FastAPI()

# Load model once at startup
def load_model():
    path = 'calorie_model.pkl'
    with open(path, 'rb') as f:
        return pickle.load(f)

model = load_model()

# Define request model
class InputData(BaseModel):
    Dish_Weight: float
    Protein: float
    Fat: float
    Carbohydrates: float
    Fiber: float

@app.get("/")
def home():
    return {"message": "Calorie Prediction API is running!"}

@app.post("/predict")
def predict_calories(data: InputData):
    df = pd.DataFrame([data.model_dump()])  # Use model_dump() instead of .dict()
    pred = model.predict(df)
    return {'Predicted Calories': pred[0]}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
