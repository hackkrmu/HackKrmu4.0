import cv2


def detect_obstacles(frame, bg_subtractor, area_threshold, debug=False):
    # background subtractor
    fg_mask = bg_subtractor.apply(frame)


    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))

    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel)
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_DILATE, kernel)

    # Find contours
    contours, _ = cv2.findContours(fg_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    obstacles = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > area_threshold:
            x, y, w, h = cv2.boundingRect(contour)
            obstacles.append((x, y, w, h))

    if debug:
        return obstacles, fg_mask
    return obstacles


def nothing(x):
    """Eat 5 star, do nothing."""
    pass


def main():
    # Initialize webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    # background subtractor (MOG2)
    bg_subtractor = cv2.createBackgroundSubtractorMOG2(history=500, varThreshold=32, detectShadows=True)

    cv2.namedWindow('Settings')
    cv2.createTrackbar('Area Threshold', 'Settings', 15000, 20000, nothing)

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break


        area_thresh = cv2.getTrackbarPos('Area Threshold', 'Settings')

        # Detect obstacles
        obstacles, fg_mask = detect_obstacles(frame, bg_subtractor, area_threshold=area_thresh, debug=True)

        # bounding boxes
        if obstacles:
            cv2.putText(frame, "Obstacle Detected!", (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
            for (x, y, w, h) in obstacles:
                cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)
        else:
            cv2.putText(frame, "No Obstacle", (50, 50),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

        # Display the live feed
        cv2.imshow("Webcam Feed", frame)
        cv2.imshow("Foreground Mask", fg_mask)

        # Exit the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
