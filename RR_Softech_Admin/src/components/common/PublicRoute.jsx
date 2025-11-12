import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/UserDashboard/useAuth";


export default function PublicRoute() {
  const { auth } = useAuth();

  // If logged in → Redirect to dashboard (prevents back navigation)
  if (auth.user) {
    return <Navigate to="/services" replace />;
  }

  return <Outlet />;
}
