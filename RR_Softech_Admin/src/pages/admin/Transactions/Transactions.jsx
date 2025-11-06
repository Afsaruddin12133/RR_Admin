import React, { useState } from "react";

import { Search } from "lucide-react";
import { transactions } from "../../../api/admin/transactions";

export default function Transactions() {

  const [search, setSearch] = useState("");



  const filteredData = transactions.filter(
    (item) =>
      item.customerName.toLowerCase().includes(search.toLowerCase()) ||
      item.serviceType.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = {
    Paid: "bg-green-600 text-white",
    Pending: "bg-yellow-600 text-white",
  };

  return (
    <div className="p-6  mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Payments Overview</h2>
        <p className="text-gray-500 text-sm">
          Track and manage all payment transactions.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Service Type</th>
              <th className="py-3 px-4">Payment Method</th>
              <th className="py-3 px-4">VAT</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Date</th>
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
                  <td className="py-3 px-4">{item.customerName}</td>
                  <td className="py-3 px-4">{item.serviceType}</td>
                  <td className="py-3 px-4">{item.paymentMethod}</td>
                  <td className="py-3 px-4">{item.vat}</td>
                  <td className="py-3 px-4 font-semibold">{item.amount}</td>
                  <td className="py-3 px-4">{item.date}</td>
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
                  colSpan="9"
                  className="text-center py-6 text-gray-500 text-sm"
                >
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
