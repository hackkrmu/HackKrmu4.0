"use client";

import { useState } from "react";
import { Shield, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChatDialog } from "@/components/chat/chat-dialog";

export function Navbar() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-[#00F0FF]" />
            <span className="text-xl font-bold gradient-text">CyberSphere</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/features" className="text-white/80 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/tools" className="text-white/80 hover:text-white transition-colors">
              Tools
            </Link>
            <Link href="/pricing" className="text-white/80 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-white/80 hover:text-white transition-colors">
              Docs
            </Link>
            <Button
              onClick={() => window.open("https://www.gaianet.ai/chat?domain=0xd55c64316cab2c4712404f97d911081c9e25db3f.us.gaianet.network", "_blank")}
              className="bg-[#00F0FF] text-black hover:bg-[#00F0FF]/90">
              <MessageSquare className="w-4 h-4 mr-2" />
               Chat Now
            </Button>

          </div>
        </div>
      </motion.nav>

      <ChatDialog 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
}