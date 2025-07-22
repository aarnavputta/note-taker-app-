"use client";

import { useState } from "react";

export default function AskAIPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm Libello AI. How can I help you today?" }
  ]);

  // Fun pre-written responses
  const aiResponses = [
    "That's an interesting question! Let me think about that...",
    "I understand what you're asking. Here's what I can tell you...",
    "Great question! Based on my analysis, I'd suggest...",
    "I see what you mean. Let me break this down for you...",
    "That's a fascinating topic! Here's my perspective...",
    "I appreciate you asking that. Here's what I know...",
    "That's a really good point. Let me elaborate...",
    "Interesting! I think the answer might be...",
    "I understand your concern. Here's what I can help with...",
    "That's a great observation! Let me explain..."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { role: "user", content: message }]);
      
      // Get random AI response
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      // Simulate typing delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: randomResponse
        }]);
      }, 800 + Math.random() * 400); // Random delay between 800-1200ms
      
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-4 py-3 rounded-2xl font-mono text-sm ${
                msg.role === "user"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Bar */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ask libello..."
              className="w-full px-4 py-3 pr-12 bg-gray-100 rounded-2xl border-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <button
              type="submit"
              disabled={!message.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 