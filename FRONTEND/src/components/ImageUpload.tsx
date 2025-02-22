import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  isProcessing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, isProcessing }) => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const startWebcam = async () => {
    try {
      setIsLoading(true);
      setShowCameraModal(true);
      
      await new Promise(resolve => setTimeout(resolve, 100));

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: isMobile ? "environment" : "user",
          width: { min: 1280, ideal: 1920, max: 2560 },
          height: { min: 720, ideal: 1080, max: 1440 },
          aspectRatio: { ideal: 16/9 },
          frameRate: { min: 30, ideal: 60 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (!videoRef.current) {
        throw new Error("Video element not found");
      }

      videoRef.current.srcObject = stream;
      videoRef.current.setAttribute('playsinline', 'true');
      videoRef.current.setAttribute('autoplay', 'true');
      
      if (videoRef.current) {
        videoRef.current.style.transform = 'translate3d(0, 0, 0)';
        videoRef.current.style.backfaceVisibility = 'hidden';
        videoRef.current.style.perspective = '1000px';
      }
      
      streamRef.current = stream;
      
      await new Promise((resolve) => {
        if (videoRef.current) {
          videoRef.current.onloadedmetadata = () => {
            resolve(true);
          };
        }
      });

      try {
        await videoRef.current.play();
        videoRef.current.onpause = () => {
          if (webcamActive && videoRef.current) {
            videoRef.current.play().catch(console.error);
          }
        };
        setWebcamActive(true);
      } catch (playError) {
        throw playError;
      }

    } catch (err) {
      let errorMessage = "";
      
      if (err instanceof DOMException) {
        switch (err.name) {
          case 'NotAllowedError':
            errorMessage = "We need permission to use your camera. Please click 'Allow' when prompted, then try again.";
            break;
          case 'NotFoundError':
            errorMessage = "We couldn't find a camera on your device. Please connect a camera or try a different device.";
            break;
          case 'NotReadableError':
            errorMessage = "Another app is using your camera. Please close other camera apps and try again.";
            break;
          default:
            errorMessage = "Something went wrong with the camera. Please check your settings and try again.";
        }
      } else {
        errorMessage = "We ran into an issue setting up your camera. Please try again in a moment.";
      }
      
      toast({
        title: "Camera Access Error",
        description: errorMessage,
        variant: "destructive",
      });
      stopWebcam();
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      const file = acceptedFiles[0];
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelect(file);

      return () => URL.revokeObjectURL(url);
    }
  }, [onImageSelect, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    disabled: isProcessing,
    multiple: false,
  });

  const captureImage = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Could not get canvas context");
      }

      ctx.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Failed to capture image");
          }

          const timestamp = new Date().getTime();
          const file = new File([blob], `capture_${timestamp}.jpg`, { 
            type: "image/jpeg",
            lastModified: timestamp
          });

          const previewUrl = URL.createObjectURL(blob);
          setPreview(previewUrl);
          onImageSelect(file);
          stopWebcam();

          return () => URL.revokeObjectURL(previewUrl);
        },
        "image/jpeg",
        0.95
      );
    } catch (error) {
      toast({
        title: "Capture Error",
        description: "Failed to capture image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopWebcam = () => {
    try {
      setWebcamActive(false);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => {
          track.stop();
        });
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setShowCameraModal(false);
    } catch (error) {
      console.error("Error stopping webcam:", error);
    }
  };

  useEffect(() => {
    return () => {
      stopWebcam();
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <div className="w-full max-w-2xl mx-auto p-4">
        <div
          {...getRootProps()}
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center
            transition-all duration-300 ease-in-out
            ${isDragActive ? "border-eco-leaf bg-eco-sky/10" : "border-gray-300"}
            ${isProcessing || isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-eco-leaf"}
          `}
        >
          <input {...getInputProps()} />
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="max-h-96 mx-auto rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPreview(null);
                }}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Upload className="h-12 w-12 text-gray-400" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">
                  Drop your image here
                </p>
                <p className="text-sm text-gray-500">
                  or click to select a file
                </p>
              </div>
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startWebcam();
                }}
                disabled={isProcessing || isLoading}
                className="mt-4"
              >
                <Camera className="h-4 w-4 mr-2" />
                Use Camera
              </Button>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCameraModal} onOpenChange={setShowCameraModal}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Camera Capture</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <Button
                onClick={captureImage}
                disabled={!webcamActive || isProcessing}
                className="shadow-lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageUpload;
