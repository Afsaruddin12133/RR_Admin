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
  viewButtonName,
  chatButtonName,
  payButtonName,
  viewButtonStyle,
}) {
  const statusClass = statusColors[status] || "bg-gray-200 text-gray-600";

  return (
    <div className="w-full max-w-[390px] sm:w-[390px] rounded-xl shadow-md border border-gray-100 p-4 bg-white hover:shadow-lg transition-all mx-auto">
      {/* Header */}
      <div className="flex flex-row items-start justify-between sm:items-start sm:justify-between mb-2 gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-xl pb-2 leading-tight break-words">
            {name}
          </h3>
          <p className="text-gray-500 text-sm sm:text-base">{serviceTitle}</p>
        </div>
        <span
          className={`text-[13px] font-medium px-2 py-[2px] rounded-full ${statusClass}`}
        >
          {status}
        </span>
      </div>

      {/* Date */}
      <p className="text-sm pb-4 pt-4 text-gray-400 mb-3 break-words">{date}</p>

      {/* Actions */}
      <div className="flex flex-col flex-row sm:flex-row sm:justify-between gap-2 sm:gap-0">
        <button
          onClick={onView}
          className={viewButtonStyle|| "flex items-center justify-center sm:justify-start gap-1 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all cursor-pointer w-full sm:w-auto"}
        >
          <Eye size={18} /> {viewButtonName || ""}
        </button>
        <button
          onClick={onChat}
          className="flex items-center justify-center sm:justify-start gap-1 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all cursor-pointer w-full sm:w-auto"
        >
          <MessageSquare size={18} /> {chatButtonName || ""}
        </button>
        <button
          onClick={onPay}
          className="flex items-center justify-center sm:justify-start gap-1 text-sm border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-all cursor-pointer w-full sm:w-auto"
        >
          <DollarSign size={18} /> {payButtonName|| ""}
        </button>
      </div>
    </div>
  );
}
