"use client";

import { useState } from 'react';
import { Send, Paperclip, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { FileUploadButton } from './file-upload-button';
import { CodeSnippetButton } from './code-snippet-button';

interface ChatInputProps {
  onSend: (message: string) => void;
  onFileUpload: (files: FileList) => void;
}

export function ChatInput({ onSend, onFileUpload }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  return (
    <div className="flex gap-3 items-center">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type your message..."
        className="bg-[#1A1A1A] border-[#00F0FF]/10 text-white focus:border-[#00F0FF]/30 focus:ring-[#00F0FF]/10"
      />
      
      <FileUploadButton onFileUpload={onFileUpload} />
      <CodeSnippetButton />

      <Button 
        onClick={handleSend} 
        className="bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90 px-6"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
}