import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col">
      <MessageList />
      <ChatInput />
    </div>
  );
}
