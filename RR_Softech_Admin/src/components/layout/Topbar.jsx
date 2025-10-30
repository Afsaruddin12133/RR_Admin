import React from "react";
import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 md:px-6 py-3 fixed top-0 left-0 z-40">
      {/* logo */}
      <h1 className="text-2xl font-bold pl-8 lg:pl-0">
        RR <span className="text-orange-400">Softech</span>
      </h1>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition">
          <Bell size={22} />
          <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

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
