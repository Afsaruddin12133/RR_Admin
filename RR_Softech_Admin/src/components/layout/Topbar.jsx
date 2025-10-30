import React from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 md:px-6 py-3 fixed md:static top-0 z-30">
      {/* Left side — Title / Breadcrumb */}
      <h1 className="text-lg md:text-xl font-semibold text-gray-800">
        RR <span className="text-blue-600">Teach</span>
      </h1>

      {/* Right side — Notification & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
          <Bell size={22} />
          <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile Avatar */}
        <div className="h-9 w-9 rounded-full overflow-hidden border border-gray-300">
          <img
            src="https://i.pravatar.cc/100?img=12"
            alt="Admin"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
