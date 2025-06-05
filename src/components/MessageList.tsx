"use client";

interface MessageListProps {
  messages: string[];
}

export default function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="rounded-full border border-gray-600 bg-gray-800/70 px-6 py-3 text-center text-gray-300 font-medium">
          Paste an article link, an article name or the article content.
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto space-y-2 p-4">
      {messages.map((msg, idx) => (
        <div key={idx} className="rounded-lg bg-gray-800 px-4 py-2">
          {msg}
        </div>
      ))}
    </div>
  );
}
