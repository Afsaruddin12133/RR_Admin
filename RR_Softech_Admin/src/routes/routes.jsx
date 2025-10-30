import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from './../components/layout/DashboardLayout';
import Pending from "../pages/Pending/Pending";
import ServicesList from "../pages/Services/ServicesList";



const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/services", element: <ServicesList /> },
      { path: "/pending", element: <Pending /> },
    //   { path: "/accepted", element: <Accepted /> },
    //   { path: "/rejected", element: <Rejected /> },
    //   { path: "/finished", element: <Finished /> },
    //   { path: "/free-consultancy", element: <FreeConsultancy /> },
      { index: true, element: <ServicesList /> }, 
    ],
  },
]);

export default router;
