import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./Component/Dashboard/DashboardPage";

import DashboardContent from "./Component/Dashboard/DashboardContent";

import SignUp from "./Component/Auth/SignUp";
import SignIn from "./Component/Auth/SignIn";

import AppointmentList from "./Component/Dashboard/Doctor/AppointmentList";
import Appointments from "./Component/Dashboard/Doctor/Appointments";
import PatientDashboard from "./Component/Dashboard/Patient/PatientDashboard";
import MyAppointments from "./Component/Dashboard/Patient/MyAppointments";
import PatientProfile from "./Component/Dashboard/Patient/PatientProfile";

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
        path: "appointment-list", // = /dashboard/signin
        element: <AppointmentList />,
      },
        {
        path: "appointment-management", // = /dashboard/signin
        element: <Appointments />,
      },
        {
        path: "patient-dashboard", 
        element: <PatientDashboard />,
      },
        {
        path: "my-appointments", 
        element: <MyAppointments />,
      },
        {
        path: "patient-profile", 
        element: <PatientProfile />,
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
