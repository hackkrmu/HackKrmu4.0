"use client";

import { motion } from "framer-motion";
import { Shield, Lock, AlertCircle, Zap, Database, Cloud } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Protection",
      description: "Real-time threat detection using advanced machine learning algorithms"
    },
    {
      icon: Lock,
      title: "Zero-Day Defense",
      description: "Protection against unknown threats before they become widespread"
    },
    {
      icon: AlertCircle,
      title: "Threat Intelligence",
      description: "Global threat database with instant updates and analysis"
    },
    {
      icon: Zap,
      title: "Automated Response",
      description: "Instant threat mitigation with automated security protocols"
    },
    {
      icon: Database,
      title: "Secure Storage",
      description: "Enterprise-grade encryption for all stored data"
    },
    {
      icon: Cloud,
      title: "Cloud Security",
      description: "Comprehensive protection for cloud infrastructure"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Advanced Security Features
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Cutting-edge cybersecurity features powered by artificial intelligence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="tool-card p-8 rounded-lg"
            >
              <feature.icon className="w-12 h-12 text-[#00F0FF] mb-4" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}