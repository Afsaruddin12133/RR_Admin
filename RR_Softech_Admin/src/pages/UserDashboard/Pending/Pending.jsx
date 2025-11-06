import { useState } from 'react';
import { services } from './../../../api/services';

import ServiceCard from '../../../components/shared/userDashboard/ServiceCard';
import Model from '../Services/Model';


export default function Pending() {
  const [selectedService, setSelectedService] = useState(null);

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const pendingServices = services.filter(service => service.status === "Pending");

  return (
    <div className="relative bg-[#F5F5F5]">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">Pending Services</h1>
      <p className="text-gray-600 mb-6">
        View and manage all your pending RR Softech services
      </p>

      {/* Pending Service Cards */}
      <div className="flex flex-wrap gap-6 ">
        {pendingServices.map((service, index) => (
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
