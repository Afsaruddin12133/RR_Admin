import { Clock, FileText, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { statusColors } from "../../../utils/UserDashboard/services/statusColors";

export default function ShowMilestone() {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      title: "Frontend UI Design",
      description: "Design and develop the main dashboard UI for the project.",
      amount: "1200",
      due_date: "2025-11-20",
      status: "ACTIVE",
    },
    {
      id: 2,
      title: "Backend API Integration",
      description:
        "Integrate milestone creation and list APIs with backend services.",
      amount: "1800",
      due_date: "2025-12-05",
      status: "PENDING",
    },
    {
      id: 3,
      title: "Testing & Deployment",
      description: "Perform testing and deploy the app to production.",
      amount: "900",
      due_date: "2025-12-15",
      status: "REJECTED",
    },
  ]);

  const handlePayNow = (id) => {
    const milestone = milestones.find((m) => m.id === id);

    if (!milestone) {
      console.error("Milestone not found!");
      return;
    }
     alert(`Processing payment for: ${milestone.title} ($${milestone.amount})`);
    const updatedMilestones = milestones.map((m) =>
      m.id === id ? { ...m, status: "PAID" } : m
    );
    setMilestones(updatedMilestones);

    console.log("Payment successful for milestone:", milestone);
  };

  const handleDelete = (id) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        My Milestones
      </h2>

      {milestones.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No milestones created yet.
        </p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left bg-gray-100 border-b">
              <th className="p-3 text-sm font-medium text-gray-700">Title</th>
              <th className="p-3 text-sm font-medium text-gray-700">Amount</th>
              <th className="p-3 text-sm font-medium text-gray-700">
                Due Date
              </th>
              <th className="p-3 text-sm font-medium text-gray-700">Status</th>
              <th className="p-3 text-sm font-medium text-gray-700">Pay Now</th>
              <th className="p-3 text-sm font-medium text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((m) => (
              <tr
                key={m.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 flex items-center space-x-2">
                  <span>{m.title}</span>
                </td>
                <td className="p-3 text-gray-700">${m.amount}</td>
                <td className="p-3 text-gray-700 flex items-center space-x-2">
                  <span>{m.due_date}</span>
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-[8px] ${
                      m.status === "PENDING"
                        ? statusColors.PENDING
                        : m.status === "ACTIVE"
                        ? statusColors.ACTIVE
                        : statusColors.CANCELLED
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="">
                  <button
                    onClick={() => handlePayNow(m.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 shadow-sm flex items-center justify-center gap-2 mx-auto"
                  >
                    Pay Now
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
