"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Chat() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Welcome to CyberSentinal AI. How can I assist with your cybersecurity needs today?", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Simulate AI response and include a link to the GaiANet node
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: (
            <>
              I've analyzed your query and recommend using the{" "}
              <a
                href="https://gaiainet-node-link.example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00F0FF] underline"
              >
                GaiANet Node
              </a>{" "}
              for further analysis. Would you like assistance connecting to it?
            </>
          ),
          isBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center mb-8">
            <Shield className="w-12 h-12 text-[#00F0FF] mr-4" />
            <h1 className="text-4xl font-bold gradient-text">Security Assistant</h1>
          </div>

          <Card className="bg-black/50 border border-[#00F0FF]/10 p-6 mb-8 rounded-lg shadow-lg backdrop-blur-xl">
            <div className="flex items-center space-x-4 mb-6">
              <Bot className="w-6 h-6 text-[#00F0FF]" />
              <div>
                <h2 className="text-lg font-semibold text-white">CyberSentinal AI</h2>
                <p className="text-sm text-white/60">Advanced Security Analysis</p>
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto mb-6 space-y-4 scrollbar-thin
