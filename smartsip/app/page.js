"use client"

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import WaterProgress from "@/components/water-progress.js";
import RecordsList from "@/components/records-list.js";

export default function Page() {

  

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
