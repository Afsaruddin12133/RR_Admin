import React, { useEffect, useState } from "react";
import { stats } from "../../../api/admin/Stats";
import SearchBar from "../../../components/shared/admin/SearchBar";
import OrderCard from "../../../components/shared/userDashboard/OrderCard";
import { fetchOrders } from "../../../api/UserDashboard/orders";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------------------
  // Load Orders From API
  // ---------------------------
  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const data = await fetchOrders(); // API call
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

  // ---------------------------
  // Filter Orders Based on Search
  // ---------------------------
useEffect(() => {
  const text = search.toLowerCase();

  const filtered = orders.filter((order) => {
    const serviceName = order.serviceName?.toString()?.toLowerCase() || "";
    const plan = order.plan?.toString()?.toLowerCase() || "";
    const firstName = order.user?.first_name?.toString()?.toLowerCase() || "";
    const lastName = order.user?.last_name?.toString()?.toLowerCase() || "";

    return (
      serviceName.includes(text) ||
      plan.includes(text) ||
      firstName.includes(text) ||
      lastName.includes(text)
    );
  });

  setFilteredOrders(filtered);
}, [search, orders]);

  // ---------------------------
  // View Details Handler
  // ---------------------------
  const handleViewDetails = (order) => {
    console.log("View details clicked:", order);
    // Navigate to order details page like:
    // navigate(`/admin/orders/${order.id}`);
  };

  return (
    <div className="p-6">
      {/* HEADER */}
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
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          size="sm"
          className="relative w-full md:w-64 rounded-xl"
          iconColor="text-gray-400"
          borderColor="border-gray-200"
          focusColor="focus:ring-blue-500"
        />
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 gap-4 mb-10">
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
            <div className="p-3 bg-gray-50 rounded-lg">
              {item.icon &&
                React.createElement(item.icon, {
                  className: "text-blue-600",
                  size: 24,
                })}
            </div>
          </div>
        ))}
      </div>

      {/* RECENT ORDERS */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Service Requests
      </h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-gray-500 py-6 text-center">
          No matching orders found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => handleViewDetails(order)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
