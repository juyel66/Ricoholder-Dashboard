import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./Component/Dashboard/DashboardPage";

import DashboardContent from "./Component/Dashboard/DashboardContent";

import SignUp from "./Component/Auth/SignUp";
import SignIn from "./Component/Auth/SignIn";

import DoctorDashboard from "./Component/Dashboard/Doctor/DoctorDashboard";
import Appointments from "./Component/Dashboard/Doctor/Appointments";
import PatientDashboard from "./Component/Dashboard/Patient/PatientDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        index: true, // = /dashboard
        element: <DashboardContent />,
      },
  
  
        {
        path: "Dashboard", // = /dashboard/signin
        element: <DoctorDashboard />,
      },
        {
        path: "appointMents", // = /dashboard/signin
        element: <Appointments />,
      },
        {
        path: "patient-dashboard", // = /dashboard/signin
        element: <PatientDashboard />,
      },
      // {
      //   path: "signup", // = /dashboard/signup
      //   element: <SignUp />,
      // },
      // {
      //   path: "signin", // = /dashboard/signin
      //   element: <SignIn />,
      // },
    ],
  },
        {
        path: "signup", // = /dashboard/signup
        element: <SignUp />,
      },
      {
        path: "signin", // = /dashboard/signin
        element: <SignIn />,
      },
    
]);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="">
      <RouterProvider router={router} />
    </div>
  </StrictMode>
);
