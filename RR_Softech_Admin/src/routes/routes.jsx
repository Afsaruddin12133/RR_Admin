import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from './../components/layout/DashboardLayout';
import Services from './../pages/Services/Services';



const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { path: "/services", element: <Services /> },
    //   { path: "/pending", element: <Pending /> },
    //   { path: "/accepted", element: <Accepted /> },
    //   { path: "/rejected", element: <Rejected /> },
    //   { path: "/finished", element: <Finished /> },
    //   { path: "/free-consultancy", element: <FreeConsultancy /> },
      { index: true, element: <Services /> }, 
    ],
  },
]);

export default router;
