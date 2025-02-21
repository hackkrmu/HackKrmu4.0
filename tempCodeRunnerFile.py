import torch
import sys
import cv2

try:
    from ultralytics import YOLO
    print("loadimg YOLOv8")
    model = YOLO('runs/detect/train/weights/best.pt')

    print("Running YOLOV8 live detection")
    model.predict(source=0, show=True)  

except Exception as e:
    print(f"YOLOv8 failed with error: {e}")
    print("Attempting to load YOLOv5 instead")

    try:
        import os
        if not os.path.exists("yolov5"):
            print("Cloning YOLOv5 repository")
            os.system("git clone https://github.com/ultralytics/yolov5.git")

        os.system("pip install -r yolov5/requirements.txt")

        print("Running YOLOv5 live detection...")
        os.system("python yolov5/detect.py --weights runs/detect/train/weights/best.pt --source 0 --save")

    except Exception as e2:
        print(f"YOLOv5 also failed with error: {e2}")
        sys.exit("Error: Both YOLOv8 and YOLOv5 failed. check setup.")
