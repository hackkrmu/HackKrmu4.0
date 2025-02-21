"use client";

import { motion } from 'framer-motion';
import { ToolGrid } from '@/components/tool-grid';

export default function Tools() {
  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-black to-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Security Tools Suite
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Comprehensive security tools powered by advanced AI technology
          </p>
        </motion.div>

        <ToolGrid />
      </div>
    </div>
  );
}