import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime





path = 'static/ImagesAttendance'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)

def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList  # Correct indentation here to return after processing all images
 # Fixed formatting

encodeListKnown = findEncodings(images)
print('Encoding Complete')

# cap = cv2.VideoCapture(0)

def faceauth():
    # Open the video file
    cap = cv2.VideoCapture('uploads/video.webm')

    if not cap.isOpened():
        print("Error: Could not open video.")
        return None

    while True:
        success, img = cap.read()
        if not success:
            print("Failed to capture image from video.")
            break

        # Resize frame for faster processing and convert to RGB
        imgS = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)

        # Detect face locations and encodings in the current frame
        facesCurFrame = face_recognition.face_locations(imgS)
        encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

        # Compare faces in the current frame to known encodings
        for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
            matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
            faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
            matchIndex = np.argmin(faceDis)

            if matches[matchIndex]:
                name = classNames[matchIndex].upper()
                print("Match found for", name)

                # Return the recognized name and stop processing
                cap.release()
                cv2.destroyAllWindows()
                return name

        # Exit on 'q' key press (optional if testing manually)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Release video capture and close windows if no match found
    cap.release()
    cv2.destroyAllWindows()
    return None
