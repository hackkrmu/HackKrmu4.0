"use client"

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import WaterProgress from "@/components/water-progress.js";
import RecordsList from "@/components/records-list.js";

export default function Page() {
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Notification permission denied");
        }
      });
    }
  }, []);
  
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  
  useEffect(() => {
    const checkNotification = async () => {
      try {
        const response = await fetch("/api/proxy3");
        const result = await response.json();
        if (result.beep) {
          console.log(result)
          if (Notification.permission === "granted") {
            new Notification("Hydration Reminder", {
              body: "Time to drink water! Stay hydrated.",
              icon: "/water-icon.png",
            });
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                new Notification("Hydration Reminder", {
                  body: "Time to drink water! Stay hydrated.",
                  icon: "/water-icon.png",
                });
              }
            });
          }
        }
      } catch (error) {
        console.error("Error checking hydration notification:", error);
      }
    };

    const interval = setInterval(checkNotification, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl text-[#389cfc] font-bold">SmartSipp</h1>
        <div className="flex items-center gap-2">
          <Settings color="black" />
          <button className="w-6 h-6 bg-black rounded-full" />
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        <WaterProgress/>
        <RecordsList />
      </main>
    </div>
  );
}
