"use client";

import React, { useState } from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import CameraModal from "./cameraModal";

export default function DiagnosisButton({ onDiagnose }: { onDiagnose: (diagnosis: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch("http://localhost:8000/predict", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        console.log("API Response:", result);
        const diagnosisLabels = [
          result.cataracts_prediction.label,
          result.uveitis_prediction.label,
        ];
        onDiagnose(diagnosisLabels);
        setOpen(false);
      } catch (error) {
        console.error("Error during prediction:", error);
        onDiagnose(["Error occurred"]);
        setOpen(false);
      }
    }
  }; 
  const handleTakePhoto = () => setCameraOpen(true);

  return (
    <div>
      <Button
        variant="text"
        sx={{
          color: "#FFFFFF",
          display: "flex",
          gap: { xs: "6px", md: "10px" },
          alignItems: "center",
          fontSize: { xs: "14px", md: "18px" },
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={() => setOpen(true)}
      >
        GET DIAGNOSIS
        <BsArrowUpRightCircle className="hover:animate-spin text-[#F9C7FF] text-base md:text-2xl" />
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#0c101c",
            border: "1px solid #FFFFFF",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            width: "90%",
            maxWidth: 400,
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 3, fontSize: "20px", fontWeight: "bold" }}>
            Choose an Option
          </Typography>

          <div className="flex gap-5">
            <Button
              variant="contained"
              fullWidth
              onClick={handleTakePhoto}
              sx={{
                bgcolor: "#21252E",
                border: "1px solid #FFFFFF",
                color: "#FFFFFF",
                padding: "16px",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <FaCamera className="text-6xl mx-auto" />
              Take Photo
            </Button>
            <Button
              variant="contained"
              fullWidth
              onClick={() => fileInputRef.current?.click()}
              sx={{
                bgcolor: "#21252E",
                border: "1px solid #FFFFFF",
                color: "#FFFFFF",
                padding: "16px",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <FaRegFileAlt className="text-6xl mx-auto" />
              Upload File
            </Button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </Box>
      </Modal>

      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={async (photo: string) => {
          try {
            const response = await fetch("http://localhost:8000/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: photo }),
            });
            const result = await response.json();
            onDiagnose(result.diagnosis || "unknown");
          } catch (error) {
            console.error("Error during prediction:", error);
            onDiagnose(["error"]);
          }
        }}
      />
    </div>
  );
}
