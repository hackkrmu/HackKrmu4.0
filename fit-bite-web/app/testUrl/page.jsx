"use client"
import { useEffect, useRef, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const chunks = useRef([]);

  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
    getCameraStream();
  }, []);

  const startRecording = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;

    chunks.current = [];
    const stream = videoRef.current.srcObject ;
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });

      // Convert Blob to File
      const file = new File([blob], "recorded-video.webm", { type: "video/webm" });

      // Upload video to API for saving
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await fetch("/api/uploadVideo", {
          method: "POST",
          body: blob, // Send raw video data
        });

        const data = await response.json();
        console.log(data.message, "Saved at:", data.filePath);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="p-4">
      <video ref={videoRef} autoPlay muted className="w-full max-w-lg border rounded-lg" />
      <div className="flex gap-4 mt-4">
        {!recording ? (
          <button onClick={startRecording} className="px-4 py-2 bg-green-500 text-white rounded">
            Start Recording
          </button>
        ) : (
          <button onClick={stopRecording} className="px-4 py-2 bg-red-500 text-white rounded">
            Stop Recording
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
