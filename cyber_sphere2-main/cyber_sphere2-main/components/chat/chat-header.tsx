"use client";

import { Bot, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onClose: () => void;
  onClear: () => void;
}

export function ChatHeader({ onClose, onClear }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-[#00F0FF]/10">
      <div className="flex items-center space-x-3">
        <Bot className="w-6 h-6 text-[#00F0FF]" />
        <div>
          <h2 className="text-lg font-semibold text-white">CyberSentinal AI</h2>
          <p className="text-sm text-white/60">Advanced Security Analysis</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-white/60 hover:text-white"
        >
          Clear chat
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="text-white/60 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}