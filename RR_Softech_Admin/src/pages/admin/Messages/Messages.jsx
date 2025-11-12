import ChatBox from "../../../components/common/ChatBox";


export default function Messages() {
  

  return (
    <div className="bg-white rounded-lg flex flex-col mx-auto">
      <ChatBox currentUser="admin" storageKey="chatMessages" divHight="sm:h-[900px]" />
    </div>
  );
}
