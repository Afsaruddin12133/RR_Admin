import React from 'react'
import { transactions } from '../../../../api/admin/transactions';

export default function TransactionSection() {
  

    
  const statusColor = {
    Paid: "bg-green-600 text-white",
    Pending: "bg-yellow-600 text-white",
  };
  return (
   <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Transaction ID</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Status</th>

            </tr>
          </thead>
          <tbody>
            {transactions.length ? (
              transactions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 text-sm hover:bg-gray-100 transition"
                >
                  <td className="py-3 px-4">{item.date}</td>
                  <td className="py-3 px-4">{item.serviceType}</td>
                  <td className="py-3 px-4 font-medium">{item.id}</td>
                  <td className="py-3 px-4 font-semibold">{item.amount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-xl text-xs font-medium ${statusColor[item.status]}`}
                    >
                      {item.status}
                    </span>
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
  )
}
