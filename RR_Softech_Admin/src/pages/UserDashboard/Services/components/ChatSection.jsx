import ChatBox from "./../../../../components/common/ChatBox";

export default function ChatSection({loading,chatData,productId}) {
  
  return (
    <div>
      <ChatBox 
      currentUser="CUSTOMER" 
      storageKey="chatMessages" 
      orderId = {productId}
      chatData={chatData}
      loading={loading}
      />
    </div>
  );
}
