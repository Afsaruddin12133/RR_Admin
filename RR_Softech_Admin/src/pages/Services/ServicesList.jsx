import React from 'react'
import ServiceCard from '../../components/shared/ServiceCard'
import { services } from '../../api/services';

export default function ServicesList() {
  return (
    <div className=''>
      <h1 className='text-[#2563EB] text-2xl font-bold'>My Services</h1>
      <p className='text-gray-600'>Track and manage all your RR Softech services in one place</p>

      <div className="flex flex-wrap gap-6 p-6">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          {...service}
          onViewDetails={() => alert(`Viewing ${service.title}`)}
        />
      ))}
    </div>
    </div>
  )
}
