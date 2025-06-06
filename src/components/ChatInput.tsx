"use client";

import { FormEvent, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (text.trim() === "") return;
    await onSend(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 p-4">
      <input
        type="text"
        className="flex-1 rounded-full border border-gray-600 px-4 py-3 bg-gray-700 text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center gap-1 rounded-full bg-blue-600 px-4 py-3 text-white"
      >
        <FiArrowUpRight />
        <span className="hidden sm:inline">Send</span>
      </button>
    </form>
  );
}
