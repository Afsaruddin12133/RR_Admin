import React, { useState, useMemo } from "react";
import { X, Calendar, User, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { postAppointments } from "../../../api/UserDashboard/appointments";
import { weekdayNames } from "../../../utils/weekdayNames";

export default function BookConsultancyModal({
  availabilities,
  employeeList,
  onClose,
  onSuccess,
}) {
  const [employeeId, setEmployeeId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Filter slots based on selected employee
  const filteredSlots = useMemo(() => {
    if (!employeeId) return [];
    return availabilities.filter((slot) => slot.employee === Number(employeeId));
  }, [employeeId, availabilities]);

  const selectedSlot = filteredSlots.find((s) => s.id === Number(slotId));
  

  const handleSubmit = async () => {
    if (!employeeId || !slotId) {
      toast.error("Please select employee and schedule slot.");
      return;
    }

    const payload = {
      employee_id: Number(selectedSlot.employee),
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      notes: notes.trim() || "No notes",
    };

    console.log(payload);
    

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
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-black transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Book Free Consultancy
        </h2>

        {/* EMPLOYEE FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User size={18} /> Select Employee
          </label>
          <select
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={employeeId}
            onChange={(e) => {
              setEmployeeId(e.target.value);
              setSlotId(""); // reset slot when employee changes
            }}
          >
            <option value="">Choose employee</option>
            {employeeList.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name || "Unknown Employee"}
              </option>
            ))}
          </select>
        </div>

        {/* SLOT FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Calendar size={18} /> Select Available Slot
          </label>

          <select
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500"
            value={slotId}
            onChange={(e) => setSlotId(e.target.value)}
            disabled={!employeeId}
          >
            <option value="">Choose slot</option>

            {filteredSlots.length === 0 && employeeId && (
              <option disabled>No slots available</option>
            )}

            {filteredSlots.map((s) => (
              <option key={s.id} value={s.id}>
                {`${weekdayNames[s.weekday]} — ${s.start_time} to ${s.end_time}`}
              </option>
            ))}
          </select>
        </div>

        {/* NOTES FIELD */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText size={18} /> Notes
          </label>
          <textarea
            rows={3}
            className="w-full border rounded-lg px-3 py-2 bg-gray-50 shadow-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Write notes (optional)..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium shadow hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
