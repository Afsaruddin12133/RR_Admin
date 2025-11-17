import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({to = "/"}) {
  const token = localStorage.getItem("auth_access"); 

  if (!token) {
    return <Navigate to={to} replace />;
  }

  return <Outlet />;
}
