import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { menuItems } from "../../utils/menuItems";



export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-6 left-4 z-50 bg-white text-blue-600 "
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-[64px] md:top-0 left-0 h-[calc(100vh-64px)] md:h-auto w-64 bg-blue-700 text-white flex flex-col z-40 transform transition-transform duration-300 lg:mt-15
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Navigation */}
        <nav className="mt-4 flex-1 space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-8 py-2 rounded-lg text-sm font-medium transition-all
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

        {/* Footer */}
        <div className="p-4 text-xs text-center text-blue-200 border-t border-blue-500">
          © 2025 RR Softech
        </div>
      </aside>
    </>
  );
}
