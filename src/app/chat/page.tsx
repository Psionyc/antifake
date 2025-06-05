import ChatInput from "@/components/ChatInput"
import MessageList from "@/components/MessageList"

const messages: any[] = []

export default function ChatPage() {
  return (
    <div className="dark flex h-screen flex-col bg-background text-foreground">
      <MessageList messages={messages} />
      <ChatInput />
    </div>
  );
}
