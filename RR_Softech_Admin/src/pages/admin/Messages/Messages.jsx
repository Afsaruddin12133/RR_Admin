import React, { useState } from "react";
import ServiceSidebar from "./ServiceSidebar";
import ChatBox from "../../../components/common/ChatBox";


export default function Messages() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="flex w-full h-[900px] bg-gray-100">
      
      {/* LEFT SIDEBAR */}
      <ServiceSidebar
        setSelectedOrderId={setSelectedOrderId}
        setSelectedCustomer={setSelectedCustomer}
      />

      {/* RIGHT CHAT AREA */}
      <div className="flex-1 p-4">
        {selectedOrderId ? (
          <ChatBox
            currentUser="EMPLOYEE"
            orderId={selectedOrderId}
            customer={selectedCustomer}
            divHight="h-full"
            chatUser={selectedCustomer}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a customer to start chatting
          </div>
        )}
      </div>
    </div>
  );
}
