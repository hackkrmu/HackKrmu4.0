"use client";

import { motion } from "framer-motion";
import { Shield, Search, Database, Globe, AlertTriangle, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const tools = [
  {
    icon: Shield,
    name: "VirusTotal Integration",
    description: "Scan files and URLs against multiple antivirus engines",
    url: "http://localhost:8502/"
  },
  {
    icon: Search,
    name: "AbuseIPDB Check",
    description: "Verify IP addresses against known abuse databases",
    url: "http://localhost:8501/"
  },
  {
    icon: Database,
    name: "DeepFake Detector ",
    description: "Detect whether the photos and videos are real or fake ",
    url: "http://localhost:8502"
  },
  {
    icon: Globe,
    name: "URL Scanner",
    description: "Helps you detect malicious, suspicious, or phishing websites",
    url: "http://localhost:8502/"
  },
  {
    icon: AlertTriangle,
    name: "Threat Intelligence",
    description: "Real-time threat detection and analysis",
    url: "https://www.google.com"
  },
  {
    icon: Lock,
    name: "Password Audit",
    description: "Advanced password strength verification",
    url: "https://www.google.com"
  }
];

export function ToolGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <a href={tool.url} target="_blank" rel="noopener noreferrer">
            <Card className="tool-card p-6 cursor-pointer group">
              <tool.icon className="w-12 h-12 text-[#00F0FF] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">{tool.name}</h3>
              <p className="text-white/60">{tool.description}</p>
            </Card>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
