"use client";
import { useState, useEffect, useRef } from "react";
import { useChat } from "../Context/ChatContext";
import ReactMarkdown from 'react-markdown';
const VideoRecorder = () => {
  // const { messages, addMessage } = useChat();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const chunks = useRef([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState(null);
  const [exercise, setExercise] = useState("");
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  const handleChange = (event) => {
    // console.log(event, order.chargeId);
    setExercise(event);
  };
  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length, text, sender },
    ]);
  };
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage(input, "user");

    // Simulate AI response
    setTimeout(() => {
      addMessage("Hello! How can I help you?", "ai");
    }, 1000);

    setInput("");
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
      let prompt = ` I am doing this ${exercise}, and my current joint angle is ${result.angles} degrees. Give me feedback on whether I am doing it correctly. Also suggest improveents if needed`;
      try {
        const resFinal = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify({prompt}),
        });
        console.log({ resFinal });
        let responseText= await resFinal.text();
        console.log({ responseText });
  //       const  = await resFinal2.text();
  // console.log({ responseText });

        const aiMessages = responseText.match(/[^.!?]+[.!?]+/g) || [];
        const formattedText = aiMessages.replace(/\n/g, '<br />');
        for (const msg of formattedText) {
          if (msg.trim()) {
            addMessage(msg.trim(), "ai");
            await new Promise((resolve) => setTimeout(resolve, 500)); // Delay between messages
          }
        }
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
      <div className="flex flex-col items-center space-y-4 p-4">
        <input type="text" name="exercise" placeholder="Exercise" value={exercise}  onChange={(event) =>
                            handleChange(event.target.value)
                          } />
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

      {/* chat */}
      <div className="flex flex-col h-fit bg-gray-900 text-white p-4">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`rounded-lg p-3 max-w-xs text-sm ${
              msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            }`}>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex p-3 bg-gray-800 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded-lg outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="ml-3 px-4 py-2 bg-blue-500 rounded-lg">Send</button>
      </div>
    </div>
    </div>
  );
};

export default VideoRecorder;
