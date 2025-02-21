"use client";
import { useEffect, useRef, useState } from "react";

const VideoRecorder = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const chunks = useRef([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0],"from target");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);

    try {
      const res = await fetch("/api/uploadVideoML", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log({ result });
      setResponse(result);
      try {
        const resFinal = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify(result, 2),
        });
        console.log({ resFinal });
      } catch (err) {
        console.log(err, "gemini error");
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }

    setUploading(false);
  };
  useEffect(() => {
    async function getCameraStream() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
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
    const stream = videoRef.current.srcObject;
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });

      // Convert Blob to File
      const file = new File([blob], "recorded-video.webm", {
        type: "video/webm",
      });

      // Upload video to API for saving
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await fetch("/api/uploadVideo", {
          method: "POST",
          body: blob, // Send raw video data
        });

        const data = await response.json();
        // console.log(data.message, "Saved at:", data.filePath);
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
      {/* <video ref={videoRef} autoPlay muted className="w-full max-w-lg border rounded-lg" /> */}
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
      <div className="flex flex-col items-center space-y-4 p-4">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="border p-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
        {response && (
          <pre className="bg-gray-100 p-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default VideoRecorder;
