"use client";

import { FiCpu, FiUser } from "react-icons/fi";

interface Message {
  text: string;
  sender: "user" | "bot";
  error?: boolean;
  loading?: boolean;
}

interface MessageListProps {
  messages: Message[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="space-y-2 rounded-md border border-gray-600 bg-neutral-900 px-8 py-4 text-gray-300">
          <p className="text-sm font-medium">Example prompts:</p>
          <ul className="list-inside list-disc space-y-1 text-sm">
            <li>"Is this Guardian article fake?"</li>
            <li>"Check if this story is credible."</li>
          </ul>
        </div>
      </div>
    );
  }

  const renderText = (text: string) => {
    const html = text
      .split("\n")
      .map((l) => l.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"))
      .join("<br/>");
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <div className="flex-1 w-full space-y-4 p-4">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : ""}`}
        >
          {msg.sender === "bot" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
              <FiCpu className="text-white" />
            </div>
          )}
          <div
            className={`order-1 rounded-lg px-4 py-2 max-w-[80%] ${
              msg.sender === "user"
                ? "bg-blue-600 text-white"
                : msg.error
                  ? "bg-red-900 text-red-200 border border-red-400"
                  : "bg-gray-800 text-white"
            }`}
          >
            {msg.loading ? (
              <div className="h-4 w-20 animate-pulse rounded bg-gray-600" />
            ) : (
              renderText(msg.text)
            )}
          </div>
          {msg.sender === "user" && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
              <FiUser className="text-white" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
