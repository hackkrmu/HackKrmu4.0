import cv2
import numpy as np

def overlay_bounding_box(image_path, image_width, image_height, color=(0, 255, 0), alpha=0.5):
    # Read the image
    image = cv2.imread(image_path)
    overlay = image.copy()
    output = image.copy()
    
    # Define bounding box coordinates
    x1, y1 = int(0.423 * image_width), int(0.328 * image_height)
    x2, y2 = int(0.572 * image_width), int(0.866 * image_height)
    x3, y3 = x1, y2
    x4, y4 = x2, y1
    
    # Convert points to numpy array
    pts = np.array([(x1, y1), (x2, y1), (x2, y2), (x1, y2)], np.int32).reshape((-1, 1, 2))
    
    # Draw the filled polygon for transparency effect
    cv2.fillPoly(overlay, [pts], color)
    
    # Blend the overlay with the original image
    cv2.addWeighted(overlay, alpha, output, 1 - alpha, 0, output)
    
    # Draw the bounding box outline
    cv2.polylines(output, [pts], isClosed=True, color=(0, 0, 255), thickness=2)
    
    return output

# Example usage
image_path = "3.jpeg"  # Change this to your image path
image = cv2.imread(image_path)
height, width, _ = image.shape

result = overlay_bounding_box(image_path, width, height)
cv2.imshow("Overlay", result)
cv2.waitKey(0)
cv2.destroyAllWindows()
