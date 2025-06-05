"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = (text: string) => {
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, text]);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-900 text-white">
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
