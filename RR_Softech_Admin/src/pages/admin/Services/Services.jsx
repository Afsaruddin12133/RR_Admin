// File: src/features/admin/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/shared/admin/SearchBar";
import { fetchOrders } from "../../../api/UserDashboard/orders";
import OrderCard from "../../../components/shared/userDashboard/OrderCard";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // Fetch Orders from API
  // -------------------------------
  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await fetchOrders();
        setOrders(data);
        setFilteredOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  // -------------------------------
  // Handle filtering
  // -------------------------------
  useEffect(() => {
    let updated = [...orders];

    // Filter by status
    if (activeFilter !== "All") {
      updated = updated.filter(
        (item) =>
          item.status.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // Search by plan details
    if (search.trim() !== "") {
      updated = updated.filter((item) =>
        item.plan_details.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredOrders(updated);
  }, [activeFilter, search, orders]);

  // -------------------------------
  // View Details Handler
  // -------------------------------
  const handleViewDetails = (order) => {
    console.log("Viewing order:", order);
    // You can open modal or navigate here
  };

  return (
    <div className="p-6 w-full bg-white min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <p className="text-gray-500 text-sm">
          Manage and track all user orders and service purchases.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar
        type="text"
        value={search}
        placeholder="Search by plan title..."
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6"
      />

      {/* Status Filter Tabs */}
      <div className="pb-8 flex flex-row items-center gap-2 md:gap-3 overflow-x-auto whitespace-nowrap">
        {["All", "PENDING", "ACTIVE", "CANCELLED", "PAID"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`md:px-4 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-gray-300 text-black shadow-sm"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {filter}
            </button>
          )
        )}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading orders...</p>
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => handleViewDetails(order)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          No matching orders found.
        </p>
      )}
    </div>
  );
}
