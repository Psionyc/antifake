interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
}

export default function MessageList({ messages = [] }: { messages?: Message[] }) {
  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center p-4 text-center text-muted-foreground">
        Drop a news article link or its title here and we'll help you verify if
        it's genuine.
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-2 overflow-y-auto p-4">
      {messages.map((msg) => (
        <div key={msg.id} className="rounded bg-muted p-2">
          {msg.content}
        </div>
      ))}
    </div>
  )
}
