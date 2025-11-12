import React, { useEffect, useState } from "react";
import ChatSection from "./components/ChatSection";
import TransactionSection from "./components/TransactionSection";
import PaymentSection from "./components/PaymentSection";
import FeedbackSection from "./components/FeedbackSection";
import RightSideModal from "./../../../components/shared/UserDashboard/RightSideModal";
import Milestone from "./components/Milestone";
import WorkUpdate from "./components/WorkUpdate";
import { getButtonClass } from "../../../utils/UserDashboard/services/getButtonClass";
import { tabs } from "../../../utils/UserDashboard/services/tabsItems";

export default function Model({
  selectedOrder,
  setSelectedOrder,
  visibleTabs, 
}) {
  
  // compute which tabs to show (respect visibleTabs if provided)
  const effectiveTabs = Array.isArray(visibleTabs) && visibleTabs.length
    ? tabs.filter((t) => visibleTabs.includes(t.value))
    : tabs;

  const [activeTab, setActiveTab] = useState(
    effectiveTabs[0]?.value ?? "Chatting"
  );

  const closeModal = () => {
    setSelectedOrder(null);
  };

  useEffect(() => {
    setActiveTab(effectiveTabs[0]?.value ?? "Chatting");
  }, [selectedOrder, visibleTabs]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RightSideModal
      isOpen={!!selectedOrder}
      onClose={closeModal}
      selectedService={selectedOrder}
    >
      {selectedOrder && (
        <div className="">
          <div className="flex flex-col sm:flex-row bg-blue-100 rounded-xl p-1.5 space-y-1 sm:space-y-0 sm:space-x-1">
            {effectiveTabs.map((tab) => (
              <button
                key={tab.value}
                className={getButtonClass(tab.value, activeTab)}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {activeTab === "Chatting" && <ChatSection />}
            {activeTab === "Transaction" && <TransactionSection />}
            {activeTab === "Payment" && <PaymentSection />}
            {activeTab === "Feedback" && <FeedbackSection />}
            {activeTab === "Milestone" && <Milestone />}
            {activeTab === "WorkUpdate" && <WorkUpdate />}
          </div>
        </div>
      )}
    </RightSideModal>
  );
}
