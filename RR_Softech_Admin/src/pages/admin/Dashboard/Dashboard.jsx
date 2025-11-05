import React, { useState } from "react";
import { Search, Users, Activity, Clock, DollarSign } from "lucide-react";
import { servicesData } from "../../../api/admin/servicesData";
import AdminServiceCard from "../../../components/shared/admin/AdminServiceCard";
import { stats } from "../../../api/admin/Stats";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  const filteredData = servicesData.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    service.serviceTitle.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Admin Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm">
            Monitor all activities and performance metrics in one place.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h3 className="text-xl font-semibold text-gray-800">
                {item.value}
              </h3>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Recent Services Section */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Service Requests
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((service) => (
            <AdminServiceCard
              key={service.id}
              {...service}
              onView={() => console.log("Viewing:", service.name)}
              onChat={() => console.log("Chat with:", service.name)}
              onPay={() => console.log("Pay for:", service.serviceTitle)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center py-6">
            No matching services found.
          </p>
        )}
      </div>
    </div>
  );
}
