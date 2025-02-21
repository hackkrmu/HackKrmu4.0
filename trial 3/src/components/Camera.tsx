"use client";
import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';
import { useStore } from '../store/useStore';
import { Camera as CameraIcon, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { Notification } from './Notification';

const GARBAGE_ITEMS = ['bottle', 'cup', 'bowl', 'can', 'box', 'plastic', 'paper'];
const POINTS_PER_ITEM = 10;

const RECYCLING_TIPS = [
  "Did you know? Recycling one aluminum can saves enough energy to run a TV for 3 hours!",
  "Plastic bottles can take up to 450 years to decompose in landfills.",
  "Glass can be recycled endlessly without losing quality or purity!",
  "Paper can be recycled 5 to 7 times before the fibers become too short.",
  "Recycling helps reduce greenhouse gas emissions and saves energy!"
];

const VIRTUAL_ITEMS = [
  { type: 'bottle', points: 10, position: { x: 100, y: 200 } },
  { type: 'can', points: 15, position: { x: 300, y: 150 } },
  { type: 'paper', points: 5, position: { x: 200, y: 300 } },
];

export const CameraComponent: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [model, setModel] = useState<cocossd.ObjectDetection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const { addPoints, addDetectedItem, updateDailyChallenge } = useStore();

  useEffect(() => {
    const loadModel = async () => {
      await tf.ready();
      const loadedModel = await cocossd.load();
      setModel(loadedModel);
      setIsLoading(false);
      setNotification("AR Camera Ready! Start scanning trash items.");
    };
    loadModel();

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (pos) => setPosition(pos),
        (err) => console.error('Error getting location:', err),
        { enableHighAccuracy: true }
      );
    }

    updateDailyChallenge();
  }, []);

  useEffect(() => {
    const setupCamera = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false,
        });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing camera:', err);
        setNotification("Camera access denied. Please enable camera permissions.");
      }
    };

    setupCamera();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVideoReady = () => {
      if (video.readyState >= 2) { // Have enough data to play
        setIsVideoReady(true);
        if (canvasRef.current) {
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;
        }
      }
    };

    video.addEventListener('loadeddata', handleVideoReady);
    video.addEventListener('playing', handleVideoReady);

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady);
      video.removeEventListener('playing', handleVideoReady);
    };
  }, []);

  const showNotification = (message: string) => {
    const randomTip = RECYCLING_TIPS[Math.floor(Math.random() * RECYCLING_TIPS.length)];
    setNotification(`${message}\n\nTip: ${randomTip}`);
  };

  const detectObjects = async () => {
    if (!model || !videoRef.current || !position || !canvasRef.current || !isVideoReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ensure canvas dimensions match video
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const predictions = await model.detect(video);
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Scale virtual items based on canvas size
    const scaleX = canvas.width / 400;
    const scaleY = canvas.height / 400;
    
    // Draw virtual items
    VIRTUAL_ITEMS.forEach(item => {
      const x = item.position.x * scaleX;
      const y = item.position.y * scaleY;
      
      ctx.fillStyle = 'rgba(255, 179, 107, 0.5)'; // nectar color with transparency
      ctx.beginPath();
      ctx.arc(x, y, 20 * Math.min(scaleX, scaleY), 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#634832'; // brown color
      ctx.font = `${14 * Math.min(scaleX, scaleY)}px Arial`;
      ctx.fillText(item.type, x - 20 * scaleX, y - 25 * scaleY);
    });

    // Draw detected items
    predictions.forEach((prediction) => {
      if (GARBAGE_ITEMS.includes(prediction.class.toLowerCase())) {
        const [x, y, width, height] = prediction.bbox;
        
        ctx.strokeStyle = '#A67F5C'; // sepia color
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        ctx.fillStyle = '#634832'; // brown color
        ctx.font = '16px Arial';
        ctx.fillText(
          `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
          x,
          y > 20 ? y - 5 : y + height + 20
        );

        addPoints(POINTS_PER_ITEM);
        addDetectedItem(
          prediction.class,
          position.coords.latitude,
          position.coords.longitude
        );
        showNotification(`Found ${prediction.class}! +${POINTS_PER_ITEM} points`);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading && isVideoReady) {
        detectObjects();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isVideoReady, position]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-cream">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative bg-cream rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full rounded-lg shadow-lg"
        onLoadedData={() => setIsVideoReady(true)}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-4 right-4 bg-cream p-2 rounded-full shadow-lg">
        <CameraIcon className="w-6 h-6 text-sepia" />
      </div>
      
      {!position && (
        <div className="absolute top-4 left-4 bg-sand bg-opacity-90 p-2 rounded-lg shadow flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-brown" />
          <span className="text-sm text-brown">Waiting for location...</span>
        </div>
      )}

      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};