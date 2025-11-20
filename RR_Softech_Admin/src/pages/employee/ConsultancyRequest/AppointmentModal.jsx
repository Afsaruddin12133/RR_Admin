import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { editMeetingLink } from "../../../api/employee/availabilities";

export default function AppointmentModal({ data, onClose, onSuccess }) {
  const [meetingLink, setMeetingLink] = useState(data.meeting_link || "");

  async function handleSave() {
    try {
      const payload = { meeting_link: meetingLink };
      await editMeetingLink(data.id, payload);

      toast.success("Meeting link updated successfully.");
      onSuccess();
      onClose();
      
    } catch (err) {
      toast.error("Failed to update meeting link.");
      console.log(err);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-bold mb-4">Appointment - {data.id}</h2>

        <div className="space-y-3 mb-5 text-sm text-gray-600">
          <p>
            <strong>Customer:</strong> {data.customer.first_name}{" "}
            {data.customer.last_name}
          </p>
          <p>
            <strong>Status:</strong> {data.status}
          </p>
          <p>
            <strong>Start:</strong> {new Date(data.start_time).toLocaleString()}
          </p>
          <p>
            <strong>End:</strong> {new Date(data.end_time).toLocaleString()}
          </p>
        </div>

        {/* Meeting Link Input */}
        <div>
          <label className="font-medium">Meeting Link</label>
          <input
            type="text"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://meet.google.com/xxx-xxxx"
            className="w-full mt-1 border rounded-lg p-2 focus:ring focus:ring-green-200"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save & Confirm
        </button>
      </div>
    </div>
  );
}
