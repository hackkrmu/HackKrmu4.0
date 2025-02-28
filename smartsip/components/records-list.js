"use client";

import { Coffee, Droplet, Timer, Wine, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const iconMap = {
  intake: Droplet, // Drinking water
  refill: Timer, // Refilling water
};

export default function RecordsList() {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch("/api/proxy2"); // Proxying to avoid CORS issues
        const data = await response.json();
        setRecords(data.data || []);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

  // Function to format date & time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }); // "Jan 21"

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }); // "7:59 PM"

    return `${formattedDate} at ${formattedTime.toLowerCase()}`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4 bg-white p-5 rounded-2xl">
        <h2 className="text-lg text-gray-500 font-semibold text-center">Recent Activity</h2>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse text-center" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-white p-5 rounded-2xl">
      <h2 className="text-lg text-gray-500 font-semibold text-center">Recent Activity</h2>
      {currentRecords.length === 0 ? (
        <p className="text-gray-500 text-center">No records found</p>
      ) : (
        currentRecords.map((record, index) => {
          const isIntake = record.isintake === "1";
          const Icon = isIntake ? iconMap.intake : iconMap.refill;
          const actionText = isIntake ? "Drank Water" : "Refilled Water";

          return (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm shadow-[#dbeafe]"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isIntake ? "bg-blue-100" : "bg-yellow-100"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isIntake ? "text-[#389cfc]" : "text-[#f59e0b]"}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-600">{formatDateTime(record.datetime)}</span>
                  <span className="text-sm text-gray-400">{actionText}</span>
                </div>
              </div>
              <span className="text-[#389cfc]">{record.amount} mL</span>
            </motion.div>
          );
        })
      )}

      {/* Pagination Controls (Only show if more than one page) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-4">
          <button
            className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <ChevronRight className="w-6 h-6 text-black" />
          </button>
        </div>
      )}
    </div>
  );
}
