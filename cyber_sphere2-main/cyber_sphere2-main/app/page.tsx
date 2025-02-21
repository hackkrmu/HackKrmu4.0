"use client";

import { motion } from "framer-motion";
import { Shield, Lock, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroAnimation } from "@/components/hero-animation";
import { ToolGrid } from "@/components/tool-grid";
import { ChatInterface } from "@/components/chat-interface";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="container mx-auto px-4 flex flex-col items-center text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
          >
            AI-Powered Cybersecurity
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl"
          >
            Protect your digital assets with advanced threat detection and real-time response powered by artificial intelligence.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Button size="lg" className="bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90">
              Start Protection
            </Button>
            <Button size="lg" variant="outline" className="border-[#00F0FF] text-[#00F0FF]">
              Watch Demo
            </Button>
          </motion.div>
        </div>
        <HeroAnimation />
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Advanced Protection Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "AI Detection", description: "Real-time threat detection powered by advanced AI algorithms" },
              { icon: Lock, title: "Zero-Day Protection", description: "Protection against unknown and emerging threats" },
              { icon: AlertCircle, title: "Threat Intelligence", description: "Global threat database with instant updates" },
              { icon: Zap, title: "Quick Response", description: "Automated incident response and mitigation" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-lg tool-card"
              >
                <feature.icon className="h-12 w-12 text-[#00F0FF] mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Chatbot Interface */}
      <section className="py-20 bg-gradient-to-b from-black to-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <ChatInterface />
        </div>
      </section>

      {/* Tools Integration Hub */}
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center gradient-text">
            Security Tools Integration
          </h2>
          <ToolGrid />
        </div>
      </section>
    </main>
  );
}