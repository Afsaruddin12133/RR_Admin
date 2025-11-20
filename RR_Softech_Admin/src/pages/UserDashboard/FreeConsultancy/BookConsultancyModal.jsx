import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { postAppointments } from "../../../api/UserDashboard/appointments";


export default function BookConsultancyModal({
  appointments,
  availabilities,
  onClose,
  onSuccess,
}) {
  const [employee, setEmployee] = useState("");
  const [slot, setSlot] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract unique employees from appointments
  const uniqueEmployees = [
    ...new Map(
      appointments.map((i) => [i.employee.id, i.employee])
    ).values(),
  ];

  const selectedSlot = availabilities.find((s) => s.id === Number(slot));

  const handleSubmit = async () => {
    if (!employee || !slot) {
      toast.error("Please select employee and schedule slot.");
      return;
    }

    const payload = {
      employee_id: Number(employee),
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      notes: notes.trim() || "No notes",
    };

    try {
      setLoading(true);
      await postAppointments(payload);
      toast.success("Consultancy booked successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to book consultancy.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Book Free Consultancy
        </h2>

        {/* Employee */}
        <label className="block text-sm font-medium mb-1">Select Employee</label>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          value={employee}
          onChange={(e) => setEmployee(e.target.value)}
        >
          <option value="">Select Employee</option>
          {uniqueEmployees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.first_name} {emp.last_name}
            </option>
          ))}
        </select>

        {/* Time Slot */}
        <label className="block text-sm font-medium mb-1">Select Available Slot</label>
        <select
          className="w-full border rounded-lg px-3 py-2 mb-4 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        >
          <option value="">Select Schedule</option>
          {availabilities.map((s) => (
            <option key={s.id} value={s.id}>
              {`Day ${s.weekday} — ${s.start_time.slice(11, 16)} to ${s.end_time.slice(11, 16)}`}
            </option>
          ))}
        </select>

        {/* Notes */}
        <label className="block text-sm font-medium mb-1">Notes</label>
        <textarea
          rows={3}
          className="w-full border rounded-lg px-3 py-2 mb-5 bg-white shadow-sm focus:ring-2 focus:ring-blue-500"
          placeholder="Write notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
