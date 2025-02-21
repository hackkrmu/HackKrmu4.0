"use client";

import Hero from "@/components/Hero";
import axios from "axios";
import { useState } from "react";

export default function Page() {
    const [url, setUrl] = useState<string>("");
    const [analyzeResult, setAnalyzeResult] = useState<string | null>(null);

    const handleUrlAnalyze = async () => {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            setAnalyzeResult("Please include 'http://' or 'https://' in the URL.");
            return;
        }
    
        try {
            const res = await axios.post("/api/virustotal", { urlToAnalyze: url });
            if (res?.data?.stats) {
                setAnalyzeResult(res.data.stats);
            } else {
                setAnalyzeResult("No analysis result available.");
            }
        } catch (error) {
            setAnalyzeResult("Error occurred while analyzing the URL.");
            console.error("Error analyzing URL:", error);
        }
    };

    // Icons for different risk levels
    const icon: { [key: string]: JSX.Element } = {
        "Low Risk": (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="none" stroke="green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
            </svg>
        ),
        "Moderate Risk": (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="none" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-alert">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
            </svg>
        ),
        "High Risk": (
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-x">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m14.5 9-5 5" />
                <path d="m9.5 9 5 5" />
            </svg>
        ),
    };

    return (
        <section className="flex flex-col justify-between bg-white dark:bg-gray-900 min-h-screen">
            <div>
                <Hero />
                <div className="px-4 mx-auto max-w-2xl flex flex-col items-center justify-center">
                    <div className="w-full flex flex-col items-center">
                        <div className="sm:col-span-2 w-full">
                            <label className="block mb-2 text-md font-medium text-gray-900 text-center dark:text-white">
                                Domain or URL to Analyze
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Type domain to check"
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-900 rounded-lg hover:bg-primary-800"
                        onClick={handleUrlAnalyze}
                    >
                        Check URL
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center w-full py-5">
                    {analyzeResult && icon[analyzeResult]}
                    <h3 className="text-md">{analyzeResult}</h3>
                </div>
            </div>
            <div className="flex justify-center items-center w-full py-5">
                Made with
                <img
                    className="ml-1"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/VirusTotal_logo.svg/2560px-VirusTotal_logo.svg.png"
                    width={100}
                    alt="VirusTotal logo"
                />
            </div>
        </section>
    );
}
