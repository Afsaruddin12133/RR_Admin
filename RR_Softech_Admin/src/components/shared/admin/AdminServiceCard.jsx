import React from "react";
import { Eye, MessageSquare, DollarSign } from "lucide-react";
import { statusColors } from "../../../utils/services/statusColors";

export default function AdminServiceCard({
  name,
  serviceTitle,
  date,
  status,
  onView,
  onChat,
  onPay,
}) {
  const statusClass = statusColors[status] || "bg-gray-200 text-gray-600";

  return (
    <div className="w-[356px] rounded-xl shadow-md border border-gray-100 p-4 bg-white hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-800 text-sm leading-tight">
            {name}
          </h3>
          <p className="text-gray-500 text-xs">{serviceTitle}</p>
        </div>
        <span
          className={`text-[10px] font-medium px-2 py-[2px] rounded-full ${statusClass}`}
        >
          {status}
        </span>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-400 mb-3">{date}</p>

      {/* Actions */}
      <div className="flex justify-between">
        <button
          onClick={onView}
          className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 transition-all"
        >
          <Eye size={14} /> View
        </button>
        <button
          onClick={onChat}
          className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 transition-all"
        >
          <MessageSquare size={14} /> Chat
        </button>
        <button
          onClick={onPay}
          className="flex items-center gap-1 text-xs border border-gray-200 rounded-lg px-3 py-1 hover:bg-gray-50 transition-all"
        >
          <DollarSign size={14} /> Pay
        </button>
      </div>
    </div>
  );
}
