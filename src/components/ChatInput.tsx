"use client";

import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { FiArrowUpRight, FiImage } from "react-icons/fi";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("apikey", "helloworld");
    form.append("language", "eng");
    form.append("file", file);
    const res = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    const text = data?.ParsedResults?.[0]?.ParsedText || "";
    if (text) await onSend(text);
    if (fileRef.current) fileRef.current.value = "";
  };

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
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleImageChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-1 rounded-full bg-gray-700 px-4 py-3 text-white"
      >
        <FiImage />
        <span className="hidden sm:inline">Upload</span>
      </button>
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
