import ChatBox from "./../../../../components/common/ChatBox";

export default function ChatSection() {
  return (
    <div>
      <ChatBox currentUser="user" storageKey="chatMessages" />
    </div>
  );
}
