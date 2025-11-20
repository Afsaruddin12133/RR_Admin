import { Calendar, Clock, User, Video, StickyNote } from "lucide-react";

export default function AppointmentList({ showAppointments }) {


  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (iso) => {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Appointments
      </h2>

      {showAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {showAppointments.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition overflow-hidden"
            >
              {/* Header */}
              <div className="bg-blue-600 text-white px-5 py-3 flex justify-between items-center">
                <div className="text-lg font-semibold">
                  {item.customer.first_name} {item.customer.last_name}
                </div>
                <span className="text-sm bg-white/20 px-3 py-1 rounded-lg">
                  {item.status}
                </span>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">

                {/* Customer Info */}
                <div className="flex items-center gap-3 text-gray-700">
                  <User size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium">
                      {item.customer.first_name} {item.customer.last_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.customer.profile?.phone_number}
                    </p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-3 text-gray-700">
                  <Calendar size={20} className="text-green-600" />
                  <p className="font-medium">{formatDate(item.start_time)}</p>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={20} className="text-purple-600" />
                  <p className="font-medium">
                    {formatTime(item.start_time)} - {formatTime(item.end_time)}
                  </p>
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="flex items-start gap-3 text-gray-700">
                    <StickyNote size={20} className="text-yellow-600 mt-0.5" />
                    <p className="text-sm">{item.notes}</p>
                  </div>
                )}

                {/* Join Meeting */}
                <div className="pt-3">
                  <button
                    disabled={!item.meeting_link}
                    onClick={() =>
                      window.open(item.meeting_link, "_blank", "noopener")
                    }
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white font-medium transition 
                      ${item.meeting_link ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}
                    `}
                  >
                    <Video size={18} />
                    Join Meeting
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
