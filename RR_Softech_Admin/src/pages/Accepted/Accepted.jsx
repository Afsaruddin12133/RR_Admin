import React, { useState } from 'react'
import { services } from "../../api/services";
import ServiceCard from '../../components/shared/ServiceCard';
import Model from '../Services/Model';

export default function Accepted() {
  const [selectedService, setSelectedService] = useState(null);

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const acceptedServices = services.filter(service => service.status === "Accepted");

  return (
    <div className="relative bg-[#F5F5F5]">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">Accepted Services</h1>
      <p className="text-gray-600 mb-6">
        View and manage all your pending RR Softech services
      </p>

      {/* Accepted Service Cards */}
      <div className="flex flex-wrap gap-6">
        {acceptedServices.map((service, index) => (
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
