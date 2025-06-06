"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { initAntiFakeAgent } from "@/lib/ai";
import { fetchArticleText } from "@/lib/article";

interface Message {
  text: string;
  sender: "user" | "bot";
  error?: boolean;
  loading?: boolean;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = async (text: string) => {
    if (text.trim() === "") return;
    setMessages((prev) => [
      ...prev,
      { text, sender: "user" },
      { text: "", sender: "bot", loading: true },
    ]);

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

      const searchRes = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: content.slice(0, 120) }),
      });
      if (searchRes.ok) {
        const data = await searchRes.json();
        const sources: string[] = data.sources || [];
        if (sources.length) {
          content += `\n\nCredible sources found on Google: ${sources.join(", ")}`;
        }
      }

      const agent = initAntiFakeAgent(apiKey);
      const result = await agent.invoke({ input: content });
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = { text: result, sender: "bot" };
        return msgs;
      });
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => {
        const msgs = [...prev];
        msgs[msgs.length - 1] = {
          text: `Error: ${err.message || err}`,
          sender: "bot",
          error: true,
        };
        return msgs;
      });
    }
  };

  return (
    <div className="flex h-screen flex-col items-center bg-neutral-950 text-white">
      <div className="w-full p-4">
        <Link href="/" className="flex items-center gap-1 text-white hover:underline">
          <FiArrowLeft /> Home
        </Link>
      </div>
      <div className="flex h-full w-full max-w-2xl flex-col">
        <MessageList messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
