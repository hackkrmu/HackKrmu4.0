"use client";

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { format } from 'date-fns';
import { Message } from '@/types/chat';

export function ChatMessage({ message }: { message: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 group ${message.isBot ? '' : 'flex-row-reverse'}`}
    >
      {message.isBot ? (
        <div className="w-8 h-8 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
          <Bot className="w-4 h-4 text-[#00F0FF]" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex-1">
        <div className={`rounded-lg p-4 max-w-[80%] ${
          message.isBot 
            ? 'bg-[#1A1A1A] border border-[#00F0FF]/10' 
            : 'bg-[#00F0FF]/10 ml-auto'
        }`}>
          {message.text}
        </div>
        <div className="text-xs text-white/40 mt-1 px-1">
          {format(message.timestamp, 'MMM d, h:mm a')}
        </div>
      </div>
    </motion.div>
  );
}