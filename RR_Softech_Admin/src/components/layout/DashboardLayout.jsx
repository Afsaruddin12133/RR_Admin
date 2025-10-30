import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar />
        <main className="mt-16 md:mt-0 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
