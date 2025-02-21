"use client";

import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CodeSnippetButton() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-[#00F0FF] hover:bg-[#00F0FF]/10"
        >
          <Code className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Insert code snippet</TooltipContent>
    </Tooltip>
  );
}