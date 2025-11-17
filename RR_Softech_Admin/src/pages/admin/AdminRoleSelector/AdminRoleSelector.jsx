import { useNavigate } from "react-router-dom";
import { Shield, Users } from "lucide-react";
import { getStoredTokens } from "../../../hooks/UserDashboard/useAuth";
import { useEffect } from "react";

export default function AdminRoleSelector() {
  const navigate = useNavigate();

  const { role } = getStoredTokens();
  useEffect(() => {
    if (role) {
      navigate("/admindashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white  shadow-2xl rounded-2xl p-8 flex flex-col items-center gap-6 border border-white/40">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          Choose Your Login Portal
        </h1>
        <p className="text-gray-600 text-center text-sm md:text-base">
          Select the correct access type to continue.
        </p>

        {/* Buttons */}
        <div className="flex flex-col w-full gap-4 mt-4">
          {/* Admin Button */}
          <button
            onClick={() => navigate("/admin/login")}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl
                       text-lg font-medium hover:bg-blue-700 transition-all shadow-md hover:shadow-xl"
          >
            <Shield size={22} className="group-hover:scale-110 transition" />
            Login as Admin
          </button>

          {/* Employee Button */}
          <button
            onClick={() => navigate("/employee/login")}
            className="group flex items-center justify-center gap-3 px-6 py-4 bg-green-600 text-white rounded-xl
                       text-lg font-medium hover:bg-green-700 transition-all shadow-md hover:shadow-xl"
          >
            <Users size={22} className="group-hover:scale-110 transition" />
            Login as Employee
          </button>
        </div>
      </div>
    </div>
  );
}
