import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  CheckCircle,
  XCircle,
  Flag,
  MessageCircle,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Services", icon: <LayoutDashboard size={18} />, path: "/services" },
    { name: "Pending", icon: <Clock size={18} />, path: "/pending" },
    { name: "Accepted", icon: <CheckCircle size={18} />, path: "/accepted" },
    { name: "Rejected", icon: <XCircle size={18} />, path: "/rejected" },
    { name: "Finished", icon: <Flag size={18} />, path: "/finished" },
    { name: "Free Consultancy", icon: <MessageCircle size={18} />, path: "/free-consultancy" },
  ];

  return (
    <>
      {/* Mobile menu toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white text-blue-600 border border-gray-200 p-2 rounded-md shadow-sm"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-blue-700 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo section */}
        <div className="p-5 text-2xl font-bold border-b border-blue-500">
          RR <span className="text-orange-400">Softech</span>
        </div>

        {/* Navigation */}
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)} 
                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${
                  isActive
                    ? "bg-blue-600 shadow-sm"
                    : "hover:bg-blue-600 hover:shadow-sm"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / version info */}
        <div className="p-4 text-xs text-center text-blue-200 border-t border-blue-500">
          © 2025 RR Softech
        </div>
      </aside>
    </>
  );
}
