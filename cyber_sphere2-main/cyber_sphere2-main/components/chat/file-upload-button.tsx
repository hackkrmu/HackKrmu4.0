"use client";

import { Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FileUploadButtonProps {
  onFileUpload: (files: FileList) => void;
}

export function FileUploadButton({ onFileUpload }: FileUploadButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <label className="cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => e.target.files && onFileUpload(e.target.files)}
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
          />
          <Button
            variant="ghost"
            size="icon"
            className="text-[#00F0FF] hover:bg-[#00F0FF]/10"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </label>
      </TooltipTrigger>
      <TooltipContent>Upload files</TooltipContent>
    </Tooltip>
  );
}