"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-gray-800">
      <input
        type="text"
        className="flex-1 rounded-lg border border-gray-600 px-4 py-3 bg-gray-700 text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white"
      >
        <ArrowUpRight size={20} />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
}
