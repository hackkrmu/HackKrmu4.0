"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! I'm your AI security assistant. How can I help protect your systems today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I've analyzed your query and detected no immediate security threats. Would you like me to perform a deeper scan?",
        isBot: true
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          AI Security Assistant
        </h2>
        <p className="text-white/60">
          Get real-time security insights and threat analysis
        </p>
      </motion.div>

      <Card className="bg-black/50 border border-white/10 p-4">
        <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-start gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-[#00F0FF]/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#00F0FF]" />
                </div>
              )}
              <div className={`rounded-lg p-3 max-w-[80%] ${
                message.isBot 
                  ? 'bg-white/5 text-white' 
                  : 'bg-[#00F0FF]/10 text-[#00F0FF] ml-auto'
              }`}>
                {message.text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about security concerns..."
            className="bg-white/5 border-white/10 text-white"
          />
          <Button onClick={handleSend} className="bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}