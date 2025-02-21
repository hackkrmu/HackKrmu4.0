import torch
import sys
import cv2

try:
    from ultralytics import YOLO
    print("loading yolOv8")

    model = YOLO('runs/detect/train/weights/best.pt')
    print("conf. threshold=50%")
    model.predict(source=0, show=True, conf=0.55)
except Exception as e:
    print(f"YOLOv8 failed=error: {e}")
    print("Attempting to load YOLOv5 instead")

    try:
        import os
        if not os.path.exists("yolov5"):
            print("Cloning yolov5 repo")
            os.system("git clone https://github.com/ultralytics/yolov5.git")

        os.system("pip install -r yolov5/requirements.txt")

        print("Running yoloV5 live with conf. threshold = 50%")
        os.system("python yolov5/detect.py --weights runs/detect/train/weights/best.pt --source 0 --conf 0.5 --save")

    except Exception as e2:
        print(f"yoloV5 failed {e2}")
        sys.exit("ErRor")
