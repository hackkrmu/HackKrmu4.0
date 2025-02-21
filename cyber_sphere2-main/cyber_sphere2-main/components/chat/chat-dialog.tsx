"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Message } from '@/types/chat';
import { ChatHeader } from './chat-header';
import { ChatMessage } from './chat-message';
import { ChatInput } from './chat-input';
import { Card } from '@/components/ui/card';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatDialog({ isOpen, onClose }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to CyberSentinal AI. How can I assist with your cybersecurity needs today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm analyzing your query and preparing a security assessment. Would you like me to perform a detailed scan?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleFileUpload = (files: FileList) => {
    // Handle file upload logic
    const fileNames = Array.from(files).map(file => file.name).join(', ');
    const message: Message = {
      id: Date.now().toString(),
      text: `Uploaded files: ${fileNames}`,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const handleClear = () => {
    setMessages([messages[0]]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 w-full max-w-lg z-50"
        >
          <Card className="bg-black/95 border border-[#00F0FF]/10 rounded-lg shadow-lg backdrop-blur-xl overflow-hidden">
            <ChatHeader onClose={onClose} onClear={handleClear} />
            
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>

            <div className="p-4 border-t border-[#00F0FF]/10">
              <ChatInput onSend={handleSend} onFileUpload={handleFileUpload} />
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}