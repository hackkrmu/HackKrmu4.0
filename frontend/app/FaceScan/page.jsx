"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie"; // Import js-cookie
const token = Cookies.get("token");

const FaceScan = () => {
  const [image, setImage] = useState(null);

  const [skinType, setSkinType] = useState(null); // State for major skin type
  const [skinDiseases, setSkinDiseases] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const [isScreen, setIsScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsScreen(window.innerWidth <= 768); // Adjust for Screen screen width
      setIsMobile(window.innerWidth <= 430);
    };

    // Initial check and adding a resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Capture the image from the camera
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (videoRef.current && videoRef.current.readyState === 4) {
      // Ensure video is ready
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/jpeg");
      setImage(dataURL);
      sendImageToBackend(dataURL);
    } else {
      console.error("Video not ready for capture");
    }
  };

  // Handle image file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataURL = reader.result;
        setImage(dataURL);
        sendImageToBackend(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  // Send image to backend
  const sendImageToBackend = async (dataURL) => {
    setIsLoading(true); // Start loader
    try {
      // Convert dataURL to a Blob
      const response = await fetch(dataURL);
      const blob = await response.blob();

      // Create FormData and append the Blob as 'image'
      const formData = new FormData();
      formData.append("image", blob, "image.jpg");

      const responseBackend = await fetch(
        `${process.env.NEXT_PUBLIC_URL_HOST}/aiface/image`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the headers
            // "Content-Type": "application/json",
          },
          credentials: "include",
          body: formData,
        }
      );
      if (responseBackend.status === 422) {
        const errorData = await responseBackend.json(); // Parse error message from backend
        alert(`Error: ${errorData.message || "Something went wrong!"}`);
        window.location.reload(); // Refresh the page
      } else if (!responseBackend.ok) {
        alert("An unexpected error occurred!");
        window.location.reload();
      }
      const result = await responseBackend.json();
      console.log(result);

      // Handle successful response
      if (responseBackend.ok) {
        setSkinType(result.skinType); // Set major skin type
 
        // setImage(null); // Clear the image preview
      } else {
        console.error("Error uploading image:", result);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle link click to start camera and capture image
  const handleCapture = async (e) => {
    if (skinType) {
      const confirmRecapture = window.confirm(
        "Are you sure you want to recapture?"
      );
      if (confirmRecapture) {
        setImage(null); // Clear the previous image
        setSkinType(null); // Reset skin type
        setSkinDiseases([]); // Reset skin diseases
        startCamera(); // Restart camera
        setTimeout(captureImage, 3000); // Capture image after a short delay (e.g., 3 seconds)
      }
    } else {
      e.preventDefault();
      await startCamera();
      setTimeout(captureImage, 3000); // Capture image after a short delay (e.g., 3 seconds)
    }
  };

  const handlereCapture = () => {};

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // Change to flex-start for top alignment
        alignItems: "center",
        marginLeft: isScreen ? "0px" : "250px",
        marginLeft: isMobile ? "0px" : "250px",
        minHeight: isScreen ? "91vh" : "100vh", // Set minHeight instead of height
        backgroundColor: "#121212",
        marginTop: isScreen ? "84px" : "84px",
        color: "#EAEAEA",
        fontFamily: "Arial, sans-serif",
        overflowY: "hidden", // Allow content to scroll vertically
      }}
    >
      {/* Disclaimer */}
      <div
        style={{
          backgroundColor: "#1e1e1e",
          color: "#BFD16D",
          padding: "10px",
          borderRadius: "10px",
          fontSize: "14px",
          textAlign: "center",
          width: "80%",
          maxWidth: "600px",
          marginBottom: "20px",
        }}
      >
        Disclaimer: The image you provide is used solely for analysis and is not
        being saved.
      </div>

      <div
        style={{
          backgroundColor: "#1e1e1e",
          padding: "30px",
          borderRadius: "20px",
          textAlign: "center",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <h2
          style={{
            color: "#EBEBEB",
            fontFamily: "Outfit, sans-serif",
            fontSize: "40px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "39px",
            letterSpacing: "-1.6px",
            marginBottom: "20px",
          }}
        >
          detect your skin type
        </h2>
        <div
          style={{
            backgroundColor: "#333",
            height: "auto", // Set to auto for dynamic content
            minHeight: "300px", // Minimum height to ensure space for video or image
            borderRadius: "20px",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {image ? (
            <img
              src={image}
              alt="Captured or Uploaded"
              style={{ width: "100%", borderRadius: "20px", height: "auto" }} // Set height to auto for responsiveness
            />
          ) : (
            <video
              ref={videoRef}
              style={{
                display: image ? "none" : "block",
                width: "100%",
                height: "100%", // Ensure video fills the container
                borderRadius: "20px",
              }}
            />
          )}
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          />
        </div>

        {/* Capture and Recapture Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {isLoading ? (
            <p style={{ color: "#BFD16D" }}>
              Hold On!! We are cooking something
            </p>
          ) : (
            <button
              onClick={handleCapture}
              style={{
                backgroundColor: "#BFD16D",
                border: "none",
                borderRadius: "20px",
                padding: "10px 20px",
                cursor: "pointer",
                fontSize: "16px",
                color: "#000",
              }}
            >
              {skinType ? "Recapture" : "Capture"}
            </button>
          )}

          {/* <button
            onClick={handleCapture}
            style={{
              backgroundColor: "#BFD16D",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#000",
            }}
          >
          {isLoading ? "Processing..." : "Capture"}
          </button> */}
          {/* <button
            onClick={() => {
              setImage(null); // Clear the previous image
              e.preventDefault();
              startCamera();
              setTimeout(captureImage, 3000); 
            }}
            style={{
              backgroundColor: "#BFD16D",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#000",
            }}
          >
            recapture
          </button> */}
          {/* <button
  onClick={handlereCapture}
  disabled={isLoading}
  style={{
    backgroundColor: "#BFD16D",
    border: "none",
    borderRadius: "20px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    color: "#000",
  }}
>
  recapture
</button> */}
        </div>

        {/* Skin Type and Chart */}
        {skinType && (
          <>
            <h3
              style={{
                marginTop: "40px",
                color: "#BFD16D",
                fontSize: "24px",
              }}
            >
              your skin type is{" "}
              <span style={{ fontWeight: "bold" }}>{skinType}</span>
            </h3>
          </>
        )}
      </div>

      {/* Conditionally render the button if skinType is present */}
      {skinType && (
        <Link href="/Ecommmerce/BuyProduct" passHref>
          <button
            style={{
              backgroundColor: "#BFD16D",
              border: "none",
              borderRadius: "20px",
              padding: "10px 20px",
              cursor: "pointer",
              fontSize: "16px",
              color: "#000",
              marginTop: "20px",
            }}
          >
            view suggested products
          </button>
        </Link>
      )}
    </div>
  );
};

export default FaceScan;
