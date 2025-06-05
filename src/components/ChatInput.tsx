export default function ChatInput() {
  return (
    <form className="flex gap-2 p-4 border-t">
      <input
        type="text"
        className="flex-1 rounded border px-3 py-2"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="rounded bg-black px-4 py-2 text-white"
      >
        Send
      </button>
    </form>
  );
}
