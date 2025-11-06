import React, { useState } from "react";
import ChatSection from "./components/ChatSection";
import TransactionSection from "./components/TransactionSection";
import PaymentSection from "./components/PaymentSection";
import FeedbackSection from "./components/FeedbackSection";
import { tabs } from './../../../utils/services/tabsItems';
import { getButtonClass } from './../../../utils/services/getButtonClass';
import RightSideModal from './../../../components/shared/UserDashboard/RightSideModal';

export default function Model({ selectedService, setSelectedService }) {
  const [activeTab, setActiveTab] = useState("Chatting");

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <RightSideModal
      isOpen={!!selectedService}
      onClose={closeModal}
      selectedService={selectedService}
    >
      {selectedService && (
        <div className="">
          <div className="flex flex-col sm:flex-row bg-blue-100 rounded-xl p-1.5 space-y-1 sm:space-y-0 sm:space-x-1">
            {tabs.map((tab) => (
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
          </div>
        </div>
      )}
    </RightSideModal>
  );
}
