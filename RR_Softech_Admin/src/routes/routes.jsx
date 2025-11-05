import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Pending from "../pages/Pending/Pending";
import ServicesList from "../pages/Services/ServicesList";
import Accepted from "../pages/Accepted/Accepted";
import Rejected from "../pages/Rejected/Rejected";
import Finished from "../pages/Finished/Finished";
import FreeConsultancy from "../pages/FreeConsultancy/FreeConsultancy";
import NotFound from "../pages/NotFound/NotFound";
import DashboardLayout from "../components/layout/dashboard/DashboardLayout";
import AdminLayout from "../components/layout/admin/AdminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";



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
      { index: true, element: <ServicesList /> }, 
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      // { path: "/services", element: <ServicesList /> },
      { index: true, element: <Dashboard /> }, 
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
