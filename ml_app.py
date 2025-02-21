from fastapi import FastAPI, File, UploadFile, HTTPException
from PIL import Image
import torch
import numpy as np
from torchvision import transforms
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SimpleCNN(torch.nn.Module):
    def __init__(self, num_classes):
        super(SimpleCNN, self).__init__()
        self.features = torch.nn.Sequential(
            torch.nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(kernel_size=2, stride=2),
            torch.nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(kernel_size=2, stride=2)
        )
        self.classifier = torch.nn.Sequential(
            torch.nn.Linear(32 * 56 * 56, 256),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.5),
            torch.nn.Linear(256, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = x.view(x.size(0), -1)
        x = self.classifier(x)
        return x


@app.get("/")
def read_root():
    return {"message": "ML API is running!"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        img_tensor = transform(image).unsqueeze(0)
        cataracts_model = SimpleCNN(num_classes=2)
        cataracts_model.load_state_dict(torch.load("cataracts_model.pth"))
        cataracts_model.eval()

        uveitis_model = SimpleCNN(num_classes=2)
        uveitis_model.load_state_dict(torch.load("uveitis_model.pth"))
        uveitis_model.eval()
        with torch.no_grad():
            output_cataracts = cataracts_model(img_tensor)
            probabilities_cataracts = torch.nn.functional.softmax(output_cataracts, dim=1)
            _, pred_cataracts = torch.max(probabilities_cataracts, 1)
            cataracts_label = "Cataracts" if pred_cataracts.item() == 0 else "Normal"
            cataracts_confidence = probabilities_cataracts[0][pred_cataracts.item()].item()

        with torch.no_grad():
            output_uveitis = uveitis_model(img_tensor)
            probabilities_uveitis = torch.nn.functional.softmax(output_uveitis, dim=1)
            _, pred_uveitis = torch.max(probabilities_uveitis, 1)
            uveitis_label = "Uveitis" if pred_uveitis.item() == 1 else "Normal"
            uveitis_confidence = probabilities_uveitis[0][pred_uveitis.item()].item()

        return {
            "cataracts_prediction": {
                "label": cataracts_label,
                "confidence": round(cataracts_confidence * 100, 2)
            },
            "uveitis_prediction": {
                "label": uveitis_label,
                "confidence": round(uveitis_confidence * 100, 2)
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")

