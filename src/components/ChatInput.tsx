"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiImage, FiClipboard } from "react-icons/fi";
import { Lightbulb } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => Promise<void> | void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");
  const [hasClipboard, setHasClipboard] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then((t) => setHasClipboard(Boolean(t.trim())))
        .catch(() => {});
    }
  }, []);

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

  const handlePasteClick = async () => {
    if (!navigator.clipboard) return;
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText.trim()) {
        setText(clipText.trim());
        setHasClipboard(false);
      }
    } catch {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 mx-auto flex w-full max-w-2xl gap-2 bg-neutral-950 p-4"
    >
      <div className="absolute bottom-full left-0 right-0 mb-2 flex flex-col gap-2 px-4 sm:flex-row sm:overflow-x-auto">
        {hasClipboard && (
          <button
            type="button"
            onClick={handlePasteClick}
            className="relative flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-left text-white"
          >
            <FiClipboard className="h-6 w-6" />
            <div className="flex flex-col">
              <span className="font-bold">Paste</span>
              <span className="text-xs text-gray-300">Insert text from your clipboard.</span>
            </div>
            <Lightbulb className="absolute right-1 top-1 h-4 w-4 text-yellow-300" />
          </button>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-2 text-left text-white"
        >
          <FiImage className="h-6 w-6" />
          <div className="flex flex-col">
            <span className="font-bold">Upload Image</span>
            <span className="text-xs text-gray-300">Snap or choose a photo to analyse.</span>
          </div>
          <Lightbulb className="absolute right-1 top-1 h-4 w-4 text-yellow-300" />
        </button>
      </div>
      <input
        type="text"
        className="flex-1 rounded-full border border-gray-600 bg-gray-700 px-4 py-3 text-white"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={fileRef}
        onChange={handleImageChange}
        className="hidden"
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
