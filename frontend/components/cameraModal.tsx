"use client";

import React, { useRef } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface CameraModalProps {
    open: boolean;
    onClose: () => void;
    onCapture: (photo: string) => void; 
}

export default function CameraModal({ open, onClose, onCapture }: CameraModalProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const startCamera = async () => {
        try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
        } catch (err) {
          onClose();
          throw err;
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
            context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
            );
            const imageData = canvasRef.current.toDataURL("image/png");
            onCapture(imageData); 
        }
        }
        stopCamera();
        onClose();
    };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach((track) => track.stop());
  };

  React.useEffect(() => {
    if (open) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
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
          maxWidth: 600,
          color: "#FFFFFF",
          textAlign: "center",
        }}
      >
        <button
            onClick={() => {onClose(); stopCamera();} }
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              color: "#FFFFFF",
            }}
          >
            ✕
          </button>
        <Typography
          variant="h6"
          sx={{ mb: 2, textTransform: "uppercase", fontWeight: "bold" }}
        >
          Capture Photo
        </Typography>
        <video ref={videoRef} className="w-full h-auto rounded-md" />
        <Button
            variant="contained"
            onClick={capturePhoto}
            sx={{
                mt: 2,
                bgcolor: "#21252E",
                border: "1px solid #FFFFFF",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontWeight: "bold",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                }}
            >
            Capture Photo
        </Button>
        <canvas ref={canvasRef} width={640} height={480} style={{ display: "none" }} />
      </Box>
    </Modal>
  );
}
