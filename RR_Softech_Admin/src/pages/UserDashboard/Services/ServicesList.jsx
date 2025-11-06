import { useState } from "react";
import { services } from "../../../api/services";
import ServiceCard from "../../../components/shared/userDashboard/ServiceCard";
import Model from "./Model";


export default function ServicesList() {
  const [selectedService, setSelectedService] = useState(null);

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="relativeb bg-[#F5F5F5]">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">My Services</h1>
      <p className="text-gray-600 mb-6">
        Track and manage all your RR Softech services in one place
      </p>

      {/* Service Cards */}
      <div className="flex flex-wrap gap-12">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            onViewDetails={() => handleViewDetails(service)}
          />
        ))}
      </div>

      {/* Modal */}
      <Model selectedService={selectedService} setSelectedService={setSelectedService} />
    </div>
  );
}
