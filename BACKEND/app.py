import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import requests
import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import os

app = Flask(__name__)
CORS(app, origins=['https://frontend-recyclopedia.vercel.app', 'https://recyclopedia-xi.vercel.app', 'http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'])

model_url = "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/latest/efficientdet_lite0.tflite"
model_path = "efficientdet_lite0.tflite"

try:
    with open(model_path, "rb") as model_file:
        pass
except FileNotFoundError:
    model_response = requests.get(model_url)
    with open(model_path, "wb") as model_file:
        model_file.write(model_response.content)

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

BaseOptions = mp.tasks.BaseOptions
ObjectDetector = mp.tasks.vision.ObjectDetector
ObjectDetectorOptions = mp.tasks.vision.ObjectDetectorOptions
VisionRunningMode = mp.tasks.vision.RunningMode

VISUALIZATION_MARGIN = 10
TEXT_ROW_SIZE = 10
TEXT_FONT_SIZE = 1
TEXT_FONT_THICKNESS = 1
GREEN = (0, 255, 0)
RED = (255, 0, 0)
BLUE = (0, 0, 255)

Recyclable = {
    "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl",
    "book", "tv", "laptop", "mouse", "remote", "keyboard", "cell phone",
    "microwave", "oven", "toaster", "refrigerator", "clock"
}

Non_Recyclable = {
    "car", "motorcycle", "airplane", "bus", "train", "truck", "boat",
    "traffic light", "fire hydrant", "stop sign", "parking meter", "bench",
    "backpack", "umbrella", "handbag", "tie", "suitcase",
    "frisbee", "skis", "snowboard", "baseball bat", "baseball glove",
    "skateboard", "surfboard", "tennis racket",
    "chair", "couch", "bed", "dining table", "toilet", "potted plant",
    "scissors", "teddy bear", "hair drier", "toothbrush"
}

Organic = {
    "banana", "apple", "sandwich", "orange", "broccoli", "carrot",
    "hot dog", "pizza", "donut", "cake",
    "bird", "cat", "dog", "horse", "sheep", "cow", "elephant",
    "bear", "zebra", "giraffe"
}

def visualize(input_image, detection_result):
    for detection in detection_result.detections:
        bounding_box = detection.bounding_box
        box_start = bounding_box.origin_x, bounding_box.origin_y
        box_end = bounding_box.origin_x + bounding_box.width, bounding_box.origin_y + bounding_box.height

        detected_object = detection.categories[0]
        object_name = detected_object.category_name
        confidence_score = round(detected_object.score, 2)

        box_color = RED if object_name in Non_Recyclable else BLUE if object_name in Recyclable else GREEN if object_name in Organic else (255, 255, 255)
        
        cv2.rectangle(input_image, box_start, box_end, box_color, 3)
        
        label_text = f"{object_name} ({confidence_score})"
        text_position = (bounding_box.origin_x + VISUALIZATION_MARGIN, bounding_box.origin_y - VISUALIZATION_MARGIN)
        cv2.putText(input_image, label_text, text_position, cv2.FONT_HERSHEY_PLAIN, TEXT_FONT_SIZE, box_color, TEXT_FONT_THICKNESS)

    return input_image

def get_object_classification(object_name):
    if object_name in Recyclable:
        return "Recyclable"
    elif object_name in Non_Recyclable:
        return "Non-Recyclable"
    elif object_name in Organic:
        return "Organic"
    return "Unknown"

@app.route('/detect', methods=['POST'])
def detect_objects():
    try:
        received_image_data = request.json.get('image')
        if not received_image_data:
            return jsonify({'error': 'No image data provided'}), 400

        image_bytes = base64.b64decode(received_image_data.split(',')[1])
        pil_image = Image.open(io.BytesIO(image_bytes))
        
        opencv_image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
        mediapipe_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=cv2.cvtColor(opencv_image, cv2.COLOR_BGR2RGB))

        detector_options = ObjectDetectorOptions(
            base_options=BaseOptions(model_asset_path=model_path),
            max_results=5,
            running_mode=VisionRunningMode.IMAGE,
            score_threshold=0.5)

        with ObjectDetector.create_from_options(detector_options) as object_detector:
            detection_results = object_detector.detect(mediapipe_image)

            if not detection_results.detections:
                return jsonify({
                    'detections': [],
                    'annotated_image': received_image_data
                })

            processed_detections = []
            for detection in detection_results.detections:
                detected_category = detection.categories[0]
                detected_box = detection.bounding_box
                processed_detections.append({
                    'category': detected_category.category_name,
                    'classification': get_object_classification(detected_category.category_name),
                    'score': round(float(detected_category.score), 2),
                    'bbox': {
                        'x': detected_box.origin_x,
                        'y': detected_box.origin_y,
                        'width': detected_box.width,
                        'height': detected_box.height
                    }
                })

            image_for_visualization = np.copy(mediapipe_image.numpy_view())
            annotated_result = visualize(image_for_visualization, detection_results)
            
            _, encoded_buffer = cv2.imencode('.jpg', cv2.cvtColor(annotated_result, cv2.COLOR_BGR2RGB))
            base64_image = base64.b64encode(encoded_buffer).decode('utf-8')

            return jsonify({
                'detections': processed_detections,
                'annotated_image': f'data:image/jpeg;base64,{base64_image}'
            })

    except Exception as error:
        print(f"Error in detection: {str(error)}")
        return jsonify({'error': str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
