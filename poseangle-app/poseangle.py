import cv2
import mediapipe as mp
import math
import time


class PoseAngle:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose()
        self.mp_drawing = mp.solutions.drawing_utils
        # Track min and max angles for elbow and knee
        self.min_elbow_angle, self.max_elbow_angle = 180, 0
        self.min_knee_angle, self.max_knee_angle = 180, 0

    def calculate_angle(self, p1, p2, p3):
        """Calculate the angle between three points and limit it to 0-180 degrees."""
        x1, y1 = p1
        x2, y2 = p2
        x3, y3 = p3

        angle = math.degrees(math.atan2(y3 - y2, x3 - x2) -
                             math.atan2(y1 - y2, x1 - x2))
        angle = abs(angle)  # Ensure positive angle
        if angle > 180:
            angle = 360 - angle  # Convert to proper range (0-180)
        return angle

    def calculate_knee_landmarks(self, results, frame):
        """Calculate the knee angle and return the landmarks."""
        landmarks = results.pose_landmarks.landmark
        h, w, _ = frame.shape

        right_hip = (int(landmarks[24].x * w), int(landmarks[24].y * h))
        right_knee = (int(landmarks[26].x * w), int(landmarks[26].y * h))
        right_ankle = (int(landmarks[28].x * w), int(landmarks[28].y * h))

        return right_hip, right_knee, right_ankle

    def calculate_elbow_landmarks(self, results, frame):
        """Calculate the elbow angle and return the landmarks."""
        landmarks = results.pose_landmarks.landmark
        h, w, _ = frame.shape

        right_shoulder = (int(landmarks[12].x * w), int(landmarks[12].y * h))
        right_elbow = (int(landmarks[14].x * w), int(landmarks[14].y * h))
        right_wrist = (int(landmarks[16].x * w), int(landmarks[16].y * h))

        return right_shoulder, right_elbow, right_wrist


def main():
    # Initialize PoseAngle class
    pose_angle = PoseAngle()

    # Open webcam (0 for default camera)
    cap = cv2.VideoCapture(0)

    # Countdown before starting
    for i in range(3, 0, -1):
        print(f"Starting in {i} seconds...")
        time.sleep(1)

    print("Recording started!")
    start_time = time.time()
    duration = 15  # Record for 15 seconds

    while cap.isOpened():
        success, frame = cap.read()
        if not success:
            break

        # Convert frame to RGB
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose_angle.pose.process(frame_rgb)

        if results.pose_landmarks:
            # Get landmarks for elbow and knee
            right_shoulder, right_elbow, right_wrist = pose_angle.calculate_elbow_landmarks(results, frame)
            right_hip, right_knee, right_ankle = pose_angle.calculate_knee_landmarks(results, frame)

            # Calculate angles
            elbow_angle = pose_angle.calculate_angle(right_shoulder, right_elbow, right_wrist)
            knee_angle = pose_angle.calculate_angle(right_hip, right_knee, right_ankle)

            # Update min/max values
            pose_angle.min_elbow_angle = min(pose_angle.min_elbow_angle, elbow_angle)
            pose_angle.max_elbow_angle = max(pose_angle.max_elbow_angle, elbow_angle)
            pose_angle.min_knee_angle = min(pose_angle.min_knee_angle, knee_angle)
            pose_angle.max_knee_angle = max(pose_angle.max_knee_angle, knee_angle)

            # Draw landmarks on the frame
            pose_angle.mp_drawing.draw_landmarks(frame, results.pose_landmarks, pose_angle.mp_pose.POSE_CONNECTIONS)

            # Display angles on the frame
            cv2.putText(frame, f"Elbow: {int(elbow_angle)} deg", (right_elbow[0] + 20, right_elbow[1] - 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            cv2.putText(frame, f"Knee: {int(knee_angle)} deg", (right_knee[0] + 20, right_knee[1] - 20),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

        # Show frame in a window
        cv2.imshow("Pose Analysis", frame)

        # Stop after 15 seconds
        if time.time() - start_time > duration:
            print("Recording finished!")
            break

        # Press 'q' to exit early
        if cv2.waitKey(10) & 0xFF == ord('q'):
            print("Recording stopped manually!")
            break

    # Release resources
    cap.release()
    cv2.destroyAllWindows()

    print(f"Elbow Min: {pose_angle.min_elbow_angle:.2f}, Max: {pose_angle.max_elbow_angle:.2f}")
    print(f"Knee Min: {pose_angle.min_knee_angle:.2f}, Max: {pose_angle.max_knee_angle:.2f}")


if __name__ == "__main__":
    main()
