// File: src/features/admin/pages/Services.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import AdminServiceCard from "../../../components/shared/admin/AdminServiceCard";
import { servicesData } from "../../../api/admin/servicesData";
import SearchBar from "../../../components/shared/admin/SearchBar";

export default function Services() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Filter by status
  const filteredByStatus =
    activeFilter === "All"
      ? servicesData
      : servicesData.filter(
          (service) =>
            service.status.toLowerCase() === activeFilter.toLowerCase()
        );

  // Filter by search
  const filteredData = filteredByStatus.filter(
    (service) =>
      service.name.toLowerCase().includes(search.toLowerCase()) ||
      service.serviceTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full bg-white h-[100vh] ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Service Requests
        </h1>
        <p className="text-gray-500 text-sm">
          Manage and track all service requests across different stages.
        </p>
      </div>
      {/* Search and Filter */}
      <SearchBar
        type="text"
        value={search}
        placeholder="service name or title"
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />
      <div className="pb-8 flex flex-row items-center  gap-1 md:gap-3 overflow-x-auto whitespace-nowrap">
        {["All", "Pending", "Accepted", "Rejected", "Finished"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`md:px-4 px-2 py-2 rounded-xl text-sm font-medium transition-all  ${
                activeFilter === filter
                  ? "bg-gray-300 text-black shadow-sm"
                  : "bg-white-600 text-black-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((service) => (
            <AdminServiceCard
              key={service.id}
              {...service}
              onView={() => console.log("Viewing:", service.name)}
              onChat={() => console.log("Chat with:", service.name)}
              onPay={() => console.log("Pay for:", service.serviceTitle)}
              viewButtonName="View Details"
              viewButtonStyle="w-[250px]  flex items-center justify-center sm:justify-center gap-2 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all cursor-pointer"
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
