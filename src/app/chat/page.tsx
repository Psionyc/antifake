"use client";

import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { initAntiFakeAgent } from "@/lib/ai";
import { fetchArticleText } from "@/lib/article";

interface Message {
  text: string;
  sender: "user" | "bot";
  error?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    if (text.trim() === "") return;
    setMessages((prev) => [...prev, { text, sender: "user" }]);

    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_KEY;
      if (!apiKey) {
        setMessages((prev) => [
          ...prev,
          { text: "API key missing", sender: "bot", error: true },
        ]);
        return;
      }

      let content = text.trim();
      if (/^https?:\/\//i.test(content)) {
        content = await fetchArticleText(content);
      }

      const agent = initAntiFakeAgent(apiKey);
      const result = await agent.invoke({ input: content });
      setMessages((prev) => [...prev, { text: result, sender: "bot" }]);
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { text: `Error: ${err.message || err}`, sender: "bot", error: true },
      ]);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-neutral-950 text-white">
      <div className="flex h-full w-full max-w-2xl flex-col">
        <MessageList messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
