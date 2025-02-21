from fastapi import FastAPI, HTTPException
import onnxruntime as ort
import numpy as np
from PIL import Image
import requests
import io
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

MODEL_PATH = "D:/EcoVisonAR/Models/yolov8m.onnx"
session = ort.InferenceSession(MODEL_PATH)

def preprocess_image(image: Image.Image):
    image = image.resize((640, 640))
    image = np.array(image).astype(np.float32) / 255.0
    image = np.transpose(image, (2, 0, 1))
    image = np.expand_dims(image, axis=0)
    return image

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict/")
async def predict(image_url: str):
    try:
        response = requests.get(image_url)
        response.raise_for_status()  
        image = Image.open(io.BytesIO(response.content))  
        input_tensor = preprocess_image(image)

        inputs = {session.get_inputs()[0].name: input_tensor}
        outputs = session.run(None, inputs)

        return {"output_shape": str(outputs[0].shape)}

    except requests.exceptions.RequestException as e:
        raise HTTPException(status_code=400, detail=f"Error fetching image: {e}")
