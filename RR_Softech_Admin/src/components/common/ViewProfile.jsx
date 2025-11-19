import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BriefcaseBusiness,
  X,
} from "lucide-react";

export default function ViewProfile({ open, onClose, user }) {
  const [permissions, setPermissions] = useState({
    viewUsers: true,
    manageUsers: true,
    viewAnalytics: true,
  });

  if (!open) return null;

  const toggle = (key) =>
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));

  const {
    name = "John Dove Rock",
    status = "Active",
    avatar =
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
    email = "jhon@example.com",
    phone = "01955656565",
    location = "Dhaka, Bangladesh",
    joined = "12 Nov 2025",
    lastActive = "2024-11-15 16:45",
    activeProjects = 8,
    openTickets = 12,
  } = user || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center pt-8 px-8">
          <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={avatar}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-3 text-xl font-semibold text-gray-900">{name}</h2>
          <span className="mt-2 inline-flex items-center px-4 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
            {status}
          </span>
        </div>

        <div className="mt-6 border-t border-gray-100" />

        {/* Main content */}
        <div className="px-8 pb-8 pt-6 space-y-6">
          {/* Top 2 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Contact info */}
            <div className="border border-gray-100 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Mail size={16} className="text-gray-400" />
                <span>{email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Phone size={16} className="text-gray-400" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <MapPin size={16} className="text-gray-400" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>Joined {joined}</span>
              </div>
            </div>

            {/* Work activity */}
            <div className="border border-gray-100 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Work Activity
              </h3>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock size={16} className="text-gray-400" />
                <div>
                  <div className="font-medium text-gray-800">Last Active</div>
                  <div className="text-gray-600 text-xs">{lastActive}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <BriefcaseBusiness size={16} className="text-gray-400" />
                <div>
                  <div className="font-medium text-gray-800">
                    Current Workload
                  </div>
                  <div className="text-gray-600 text-xs">
                    {activeProjects} active projects, {openTickets} open tickets
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role permissions */}
          <div className="border border-gray-100 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Role Permissions
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">View Users</span>
                <button
                  type="button"
                  onClick={() => toggle("viewUsers")}
                  className={`h-5 w-9 rounded-full flex items-center px-0.5 transition ${
                    permissions.viewUsers ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-sm transform transition ${
                      permissions.viewUsers ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Manage Users</span>
                <button
                  type="button"
                  onClick={() => toggle("manageUsers")}
                  className={`h-5 w-9 rounded-full flex items-center px-0.5 transition ${
                    permissions.manageUsers ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-sm transform transition ${
                      permissions.manageUsers ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-700">View Analytics</span>
                <button
                  type="button"
                  onClick={() => toggle("viewAnalytics")}
                  className={`h-5 w-9 rounded-full flex items-center px-0.5 transition ${
                    permissions.viewAnalytics ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`h-4 w-4 bg-white rounded-full shadow-sm transform transition ${
                      permissions.viewAnalytics ? "translate-x-4" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <button className="w-full py-2.5 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
              Edit Profile
            </button>

            <button className="w-full py-2.5 rounded-full bg-white border border-gray-200 text-sm text-gray-800 hover:bg-gray-50 transition">
              Suspend Employee
            </button>

            <button className="w-full py-2.5 rounded-full bg-white border border-gray-200 text-sm text-gray-800 hover:bg-gray-50 transition">
              Reset Password
            </button>

            <button className="w-full py-2.5 rounded-full bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition">
              Delete Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
