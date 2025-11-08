import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../components/layout/userDashboard/DashboardLayout";
import AdminLayout from "../components/layout/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import ServicesList from './../pages/UserDashboard/Services/ServicesList';
import Pending from './../pages/UserDashboard/Pending/Pending';
import Accepted from './../pages/UserDashboard/Accepted/Accepted';
import Rejected from './../pages/UserDashboard/Rejected/Rejected';
import Finished from './../pages/UserDashboard/Finished/Finished';
import FreeConsultancy from './../pages/UserDashboard/FreeConsultancy/FreeConsultancy';
import NotFound from './../components/common/NotFound';
import UsersManagement from "../pages/admin/UsersManage/UsersManagement";
import Services from "../pages/admin/Services/Services";
import Transactions from "../pages/admin/Transactions/Transactions";
import Analytics from "../pages/admin/Analytics/Analytics";
import Feedback from "../pages/admin/Feedback/Feedback";
import Messages from "../pages/admin/Messages/Messages";
import Settings from "../pages/admin/Settings/Settings";
import AuthModal from "../components/shared/userDashboard/auth/AuthModal";
import ChangePassword from "../components/common/ChangePassword";



const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/services", element: <ServicesList /> },
      { path: "/pending", element: <Pending /> },
      { path: "/accepted", element: <Accepted /> },
      { path: "/rejected", element: <Rejected /> },
      { path: "/finished", element: <Finished /> },
      { path: "/free-consultancy", element: <FreeConsultancy /> },
      { path: "/change-password", element: <ChangePassword /> },
      { index: true, element: <AuthModal  /> }, 
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin/users-manage", element: <UsersManagement /> },
      { path: "/admin/services", element: <Services /> },
      { path: "/admin/transactions", element: <Transactions /> },
      { path: "/admin/analytics", element: <Analytics /> },
      { path: "/admin/messages", element: <Messages /> },
      { path: "/admin/feedback", element: <Feedback /> },
      { path: "/admin/settings", element: <Settings /> },
      { index: true, element: <Dashboard /> }, 
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
