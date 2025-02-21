import cv2
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math
import time


cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=2)  # Detect up to 2 hands
offset = 20
imgSize = 300
counter1 = 0
counter2 = 0

folder = "C:\\Users\\lenovo\\OneDrive\\Desktop\\SIH\\data\\5"

while True:
    success, img = cap.read()
    if not success:
        print("Failed to capture image")
        continue

    hands, img = detector.findHands(img)

    imgWhite1 = np.ones((imgSize, imgSize, 3), np.uint8) * 255  # White canvas for hand 1
    imgWhite2 = np.ones((imgSize, imgSize, 3), np.uint8) * 255  # White canvas for hand 2

    if hands:
        for i, hand in enumerate(hands):  # Loop through both hands
            x, y, w, h = hand['bbox']

            if x - offset > 0 and y - offset > 0 and x + w + offset < img.shape[1] and y + h + offset < img.shape[0]:
                imgCrop = img[y - offset: y + h + offset, x - offset: x + w + offset]

                if imgCrop.shape[0] == 0 or imgCrop.shape[1] == 0:
                    print("Empty cropped image, skipping frame.")
                    continue

                aspectRatio = h / w
                if aspectRatio > 1:
                    k = imgSize / h
                    wCal = min(math.floor(k * w), imgSize)
                    imgResize = cv2.resize(imgCrop, (wCal, imgSize))
                    wGap = math.floor((imgSize - wCal) / 2)
                    imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
                    imgWhite[:, wGap: wGap + imgResize.shape[1]] = imgResize
                else:
                    k = imgSize / w
                    hCal = min(math.floor(k * h), imgSize)
                    imgResize = cv2.resize(imgCrop, (imgSize, hCal))
                    hGap = math.floor((imgSize - hCal) / 2)
                    imgWhite = np.ones((imgSize, imgSize, 3), np.uint8) * 255
                    imgWhite[hGap: hGap + imgResize.shape[0], :] = imgResize

                # Display images separately for each hand
                cv2.imshow(f'ImageCrop_{i+1}', imgCrop)
                cv2.imshow(f'ImageWhite_{i+1}', imgWhite)

                # Assign the images to respective variables
                if i == 0:
                    imgWhite1 = imgWhite
                elif i == 1:
                    imgWhite2 = imgWhite

    cv2.imshow('Image', img)
    
    key = cv2.waitKey(1)
    
    if key == ord("s") and len(hands) > 0:  # Save first hand
        cv2.imwrite(f'{folder}/Image1_{time.time()}.jpg', imgWhite1)
        print("First hand image saved:", counter1)
        counter1 += 1

    if key == ord("m") and len(hands) > 1:  # Save second hand
        cv2.imwrite(f'{folder}/Image2_{time.time()}.jpg', imgWhite2)
        print("Second hand image saved:", counter2)
        counter2 += 1

    if key == ord("q"):  # Exit when 'q' is pressed
        print("Exiting...")
        break

cap.release()
cv2.destroyAllWindows()
