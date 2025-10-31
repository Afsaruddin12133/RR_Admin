import React, { useState } from "react";
import ServiceCard from "../../components/shared/ServiceCard";
import RightSideModal from "../../components/shared/RightSideModal";
import { services } from "../../api/services";
import ChatSection from "./components/ChatSection";
import FeedbackSection from "./components/FeedbackSection";
import PaymentSection from "./components/PaymentSection";
import TransactionSection from "./components/TransactionSection";

export default function ServicesList() {
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("Chatting");
  const getButtonClass = (tabName) => {
    const baseClasses =
      "flex-1 text-center py-2.5 px-5 rounded-xl transition-all duration-300 ease-in-out cursor-pointer";
    if (activeTab === tabName) {
      return `${baseClasses} bg-white text-gray-900 font-semibold shadow-md`;
    } else {
      return `${baseClasses} bg-transparent text-gray-600 font-medium`;
    }
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <div className="relative">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">My Services</h1>
      <p className="text-gray-600 mb-6">
        Track and manage all your RR Softech services in one place
      </p>

      {/* Service Cards */}
      <div className="flex flex-wrap gap-6 p-6 justify-center">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            onViewDetails={() => handleViewDetails(service)}
          />
        ))}
      </div>

      {/* Modal */}
      <RightSideModal
        isOpen={!!selectedService}
        onClose={closeModal}
        selectedService={selectedService}
      >
        {selectedService && (
          <div className="">
            <div className="flex flex-col sm:flex-row bg-blue-100 rounded-xl p-1.5 space-y-1 sm:space-y-0 sm:space-x-1 ">
              <button
                className={getButtonClass("Chatting")}
                onClick={() => setActiveTab("Chatting")}
              >
                Chatting
              </button>
              <button
                className={getButtonClass("Transaction")}
                onClick={() => setActiveTab("Transaction")}
              >
                Transaction
              </button>
              <button
                className={getButtonClass("Payment")}
                onClick={() => setActiveTab("Payment")}
              >
                Payment
              </button>
              <button
                className={getButtonClass("Feedback")}
                onClick={() => setActiveTab("Feedback")}
              >
                Feedback
              </button>
            </div>
            <div className="border mt-6">
              {activeTab === "Chatting" && <ChatSection />}
              {activeTab === "Transaction" && <TransactionSection />}
              {activeTab === "Payment" && <PaymentSection />}
              {activeTab === "Feedback" && <FeedbackSection />}
            </div>
          </div>
        )}
      </RightSideModal>
    </div>
  );
}
