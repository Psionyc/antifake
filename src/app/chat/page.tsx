"use client";

import { useState } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import { initAntiFakeAgent } from "@/lib/ai";

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

      const processRes = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text }),
      });
      let content = text.trim();
      let sources: string[] = [];
      if (processRes.ok) {
        const data = await processRes.json();
        content = data.content || content;
        sources = data.sources || [];
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
    <div className="flex min-h-screen flex-col items-center bg-neutral-950 text-white">
      <div className="w-full p-4">
        <Link
          href="/"
          className="flex items-center gap-1 text-white hover:underline"
        >
          <FiArrowLeft /> Home
        </Link>
      </div>
      <div className="flex w-full max-w-2xl flex-col pb-32">
        <MessageList messages={messages} />
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
