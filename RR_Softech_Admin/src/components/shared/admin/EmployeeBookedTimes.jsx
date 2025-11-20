import React, { useEffect, useState } from "react";
import { showAvailabilities } from "../../../api/employee/availabilities";
import { Delete } from "lucide-react";
import { toast } from "react-toastify";

// Convert weekday number to readable text
const weekdayNames = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday",
};

const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const [h, m] = timeStr.split(":");
  return `${h}:${m}`;
};

const EmployeeBookedTimes = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await showAvailabilities();      
        setSlots(response);
      } catch (error) {
        console.error("Failed to load availabilities:", error);
      }
    };

    fetchSlots();
  }, []);


  const handleDelete = ()=>{

    toast.success("Not Implemented Yat")

  }

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Booked Time Slots
      </h2>

      {slots.length === 0 ? (
        <p className="text-gray-500">No availability found.</p>
      ) : (
        <div className="space-y-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {weekdayNames[slot.weekday]}
                </p>

                <p className="text-sm text-gray-600">
                  {formatTime(slot.start_time)} — {formatTime(slot.end_time)}
                </p>
              </div>

              <button 
              className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700"
              onClick={handleDelete}
              >
                <Delete size={18}/>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeBookedTimes;
