"use client";
import { useState, useEffect, useRef } from "react";
import { useChat } from "../Context/ChatContext";

const Chat = () => {
  const { messages, addMessage } = useChat();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to the latest message when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    addMessage(input, "user");

    // Simulate AI response
    setTimeout(() => {
      addMessage("Hello! How can I help you?", "ai");
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <div className="flex-1 overflow-y-auto space-y-3 p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`rounded-lg p-3 max-w-xs text-sm ${
              msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="flex p-3 bg-gray-800 rounded-lg">
        <input
          type="text"
          className="flex-1 p-2 bg-gray-700 rounded-lg outline-none text-white"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="ml-3 px-4 py-2 bg-blue-500 rounded-lg">Send</button>
      </div>
    </div>
  );
};

export default Chat;
