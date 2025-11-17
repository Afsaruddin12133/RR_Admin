import { Link } from "react-router-dom";

export default function ApprovalPending() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <h1 className="text-2xl font-semibold mb-4">Account Under Review</h1>
      <p className="text-gray-600 max-w-md">
        Your registration was successful.  
        An administrator needs to approve your account before you can log in.
      </p>

      <Link
        to="/employee/login"
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}
