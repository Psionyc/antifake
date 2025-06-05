"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { initAntiFakeAgent } from "@/lib/ai";

interface Message {
  text: string;
  sender: "user" | "bot";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_KEY;
      if (!apiKey) return;
      const agent = initAntiFakeAgent(apiKey);
      const result = await agent.invoke({ input: text });
      setMessages((prev) => [...prev, { text: result, sender: "bot" }]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-neutral-950 text-white">
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
