import React, { useEffect, useState } from "react";
import { CalendarCheck, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { showAppointments } from "../../../api/UserDashboard/appointments";
import Pagination from "../../../components/shared/userDashboard/Pagination";
import AppointmentModal from "../../employee/ConsultancyRequest/AppointmentModal";

export default function ConsultancyRequestAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
motion
  async function loadAppointments() {
    const response = await showAppointments();
    setAppointments(response || []);
  }

  useEffect(() => {
    loadAppointments();
  }, []);

  const totalPages = Math.ceil(appointments.length / pageSize);
  const paginatedItems = appointments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Consultancy Requests</h2>

      {/* CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-5 rounded-2xl shadow-lg cursor-pointer border border-gray-100 
                       hover:shadow-xl transition-all"
            onClick={() => setSelectedAppointment(item)}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                Appointment #{item.id}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === "CONFIRMED"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Requested By */}
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Requested By:
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <User size={16} />
                {item.customer.first_name} {item.customer.last_name}
              </p>
              <p className="text-xs text-gray-500 ml-6">
                Email: {item.customer.email}
              </p>
            </div>

            {/* Requested To */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">
                Requested To:
              </p>
              <p className="flex items-center gap-2 text-gray-600 text-sm">
                <User size={16} />
                {item.employee.first_name} {item.employee.last_name}
              </p>
              <p className="text-xs text-gray-500 ml-6">
                Email: {item.employee.email}
              </p>
            </div>

            {/* Time Info */}
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Clock size={16} /> Start:{" "}
                {new Date(item.start_time).toLocaleString()}
              </p>
              <p className="flex items-center gap-2">
                <CalendarCheck size={16} /> End:{" "}
                {new Date(item.end_time).toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Modal */}
      {selectedAppointment && (
        <AppointmentModal
          data={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onSuccess={loadAppointments}
        />
      )}
    </div>
  );
}
