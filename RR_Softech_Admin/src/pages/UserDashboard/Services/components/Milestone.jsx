import React, { useState } from "react";
import { Calendar, DollarSign, FileText, Clock, Trash2 } from "lucide-react";
import ShowMilestone from "../../../../components/shared/userDashboard/ShowMilestone";

export default function Milestone() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    due_date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Milestone Submit" , formData);
    
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-8">
      <div className="bg-white  rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          Create New Milestone
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter milestone title"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <DollarSign size={16} className="text-gray-500 mr-2" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the milestone..."
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Calendar size={16} className="text-gray-500 mr-2" />
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition"
            >
              Add Milestone
            </button>
          </div>
        </form>
      </div>
      <ShowMilestone />
    </div>
  );
}
