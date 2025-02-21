import cv2


def detect_obstacles(frame, threshold_value=200, area_threshold=8000, debug=False):

    # grayscale and Gaussian blur
    gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred_frame = cv2.GaussianBlur(gray_frame, (5, 5), 0)

    # binary image
    _, thresh_img = cv2.threshold(blurred_frame, threshold_value, 255, cv2.THRESH_BINARY)

    # Find contours
    contours, _ = cv2.findContours(thresh_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    obstacles = []
    for contour in contours:
        area = cv2.contourArea(contour)
        if area > area_threshold:
            # Get bounding rectangle for each obstacle
            x, y, w, h = cv2.boundingRect(contour)
            obstacles.append((x, y, w, h))

    if debug:
        return obstacles, thresh_img
    return obstacles


def nothing(x):
    """Eat 5 star, Do nothing."""
    pass


def main():
    # Initialize webcam
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    cv2.namedWindow('Settings')
    cv2.createTrackbar('Threshold', 'Settings', 200, 255, nothing)
    cv2.createTrackbar('Area Threshold', 'Settings', 8000, 20000, nothing)

    while True:
        ret, frame = cap.read()
        if not ret:
            print("Failed to grab frame")
            break

        thresh_value = cv2.getTrackbarPos('Threshold', 'Settings')
        area_thresh = cv2.getTrackbarPos('Area Threshold', 'Settings')

        obstacles, thresh_img = detect_obstacles(frame, threshold_value=thresh_value,
                                                 area_threshold=area_thresh, debug=True)

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
        cv2.imshow("Threshold Image", thresh_img)

        # Exit the loop when 'q' is pressed
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # Cleanup
    cap.release()
    cv2.destroyAllWindows()


if __name__ == '__main__':
    main()
