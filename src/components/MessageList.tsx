"use client";

interface MessageListProps {
  messages: string[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-center text-white font-bold">
        Paste an article link, an article name or the article content.
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, idx) => (
        <div key={idx} className="rounded bg-gray-800 p-2">
          {msg}
        </div>
      ))}
    </div>
  );
}
