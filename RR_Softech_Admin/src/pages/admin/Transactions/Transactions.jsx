import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/shared/admin/SearchBar";
import { fetchTransactionsall } from "../../../api/UserDashboard/transaction";


export default function Transactions() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Color Map
  const statusColor = {
    SUCCESS: "bg-green-600 text-white",
    FAILED: "bg-red-600 text-white",
    PENDING: "bg-yellow-600 text-white",
  };

  // Fetch Data
  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await fetchTransactionsall();
        setTransactions(data);
      } catch (error) {
        console.error("Error loading transactions:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTransactions();
  }, []);

  // Search Filter
  const filteredData = transactions.filter((item) => {
    const searchText = search.toLowerCase();
    return (
      item.service_name.toLowerCase().includes(searchText) ||
      item.plan_name.toLowerCase().includes(searchText) ||
      item.id.toString().includes(searchText) ||
      item.order_id.toString().includes(searchText)
    );
  });

  return (
    <div className="p-6 mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Payments Overview
        </h2>
        <p className="text-gray-500 text-sm">
          Track and manage all payment transactions.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        placeholder="search: service, plan, order ID, transaction ID..."
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500 text-sm">
          Loading transactions...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Service Name</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length ? (
                filteredData.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 text-sm hover:bg-gray-100 transition"
                  >
                    <td className="py-3 px-4 font-medium">{item.id}</td>
                    <td className="py-3 px-4">{item.order_id}</td>
                    <td className="py-3 px-4">{item.service_name}</td>
                    <td className="py-3 px-4">{item.plan_name}</td>
                    <td className="py-3 px-4 font-semibold">${item.amount}</td>
                    <td className="py-3 px-4">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-4 py-1 rounded-xl text-xs font-medium ${statusColor[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-lg cursor-pointer">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
