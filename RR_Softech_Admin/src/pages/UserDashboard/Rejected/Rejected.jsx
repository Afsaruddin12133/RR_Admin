import { useState } from 'react';
import ServiceCard from '../../../components/shared/userDashboard/ServiceCard';
import Model from '../Services/Model';
import { services } from './../../../api/services';

export default function Rejected() {
  const [selectedService, setSelectedService] = useState(null);

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const rejectedServices = services.filter(service => service.status === "Rejected");

  return (
    <div className="relative bg-[#F5F5F5]">
      <h1 className="text-[#2563EB] text-2xl font-bold mb-1">Rejected Services</h1>
      <p className="text-gray-600 mb-6">
        View and manage all your rejected RR Softech services
      </p>

      {/* Rejected Service Cards */}
      <div className="flex flex-wrap gap-6">
        {rejectedServices.map((service, index) => (
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
