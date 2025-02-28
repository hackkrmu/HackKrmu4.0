"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Bottle from "@/app/bottle.png";
export default function WaterProgress() {
  const [data, setData] = useState({
    name: "",
    dailygoal: 0,
    achivedgoal: 0,
    currentlevel: 0,
    LastIntakeAt: "",
    "water refilled": 0,
    levelpercentage: 0

  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/proxy")        
        const resData = await response.json()
        setData(resData);
        
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
    const interval = setInterval(fetchData, 1000) 
    return () => clearInterval(interval)
  }, [])

  const percentage = (data.achivedgoal / data.dailygoal) * 100;  
  const radius = 95;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;

  if (isLoading) {
    return (
      <div className="flex justify-between align-center">
        <div className="bg-gray-200 rounded-2xl w-52 h-30 mx-auto relative overflow-hidden animate-pulse">
          <div className="relative z-10">
            <div className="text-white">
            </div>
          </div>
        </div>
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center align-center">
        
      <div className="relative w-34 h-32 mx-auto">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#dbeafe"
            strokeWidth="5"
          />

          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#grad)"
            strokeWidth="9"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <defs>
            <linearGradient id="grad">
              <motion.stop
                offset="0%"
                stopColor="#38bdf8"
                animate={{
                  stopColor: ["#38bdf8", "#3b82f6", "#2563eb", "#38bdf8"],
                }}
                transition={{ repeat: 0, duration: 2, ease: "linear" }}
              />
              <motion.stop
                offset="100%"
                stopColor="#2563eb"
                animate={{
                  stopColor: ["#2563eb", "#38bdf8", "#3b82f6", "#2563eb"],
                }}
                transition={{ repeat: 0, duration: 2, ease: "linear" }}
              />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-m text-[#389cfc]">You drank</span>
          <span className="text-2xl font-bold text-[#389cfc]">
            {data.achivedgoal} mL
          </span>
          <span className="text-gray-400 text-m">/ {data.dailygoal} mL</span>
        </div>
      </div>
      <div className="bg-[#ffffff] p-5 rounded-2xl w-48 h-32 mx-auto relative overflow-hidden ">
        <div className="relative z-10">
          <p className="text-[#389cfc] text-m">Water Level</p>
          <div className="text-[#389cfc]">
            <span className="text-4xl font-bold">{data.levelpercentage}%</span>
            <p className="text-sm mt-1">{data.currentlevel}ml</p>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Image
            src={Bottle}
            width={110}
            height={190}
            className="object-contain"
          />
        </div>
        </div>
    </div>
  );
}
