import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import DashboardPage from "./Component/Dashboard/DashboardPage";


import SignUp from "./Component/Auth/SignUp";
import SignIn from "./Component/Auth/SignIn";

import AppointmentList from "./Component/Dashboard/Doctor/AppointmentList";
import Appointments from "./Component/Dashboard/Doctor/Appointments";
import PatientDashboard from "./Component/Dashboard/Patient/PatientDashboard";
import MyAppointments from "./Component/Dashboard/Patient/MyAppointments";
import PatientProfile from "./Component/Dashboard/Patient/PatientProfile";

import { getCurrentUser } from "./Component/Auth/AuthFuction";
import DoctorProfile from "./Component/Dashboard/Doctor/DoctorProfile";

// Protected Route wrapper
const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(currentUser.user.role)) {
    // role mismatch
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

// Default redirect based on role
const DefaultDashboardRedirect = () => {
  const currentUser = getCurrentUser();
  if (!currentUser) return <Navigate to="/signin" replace />;

  if (currentUser.user.role === "DOCTOR") return <Navigate to="/appointment-list" replace />;
  if (currentUser.user.role === "PATIENT") return <Navigate to="/patient-dashboard" replace />;

  return <Navigate to="/signin" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <DefaultDashboardRedirect />, // redirect user based on role
      },

      // Doctor routes
      {
        element: <ProtectedRoute allowedRoles={["DOCTOR"]} />,
        children: [
          { path: "appointment-list", element: <AppointmentList /> },
          { path: "appointment-management", element: <Appointments /> },
          { path: "doctor-profile", element: <DoctorProfile /> },
        ],
      },

      // Patient routes
      {
        element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
        children: [
          { path: "patient-dashboard", element: <PatientDashboard /> },
          { path: "my-appointments", element: <MyAppointments /> },
          { path: "patient-profile", element: <PatientProfile /> },
        ],
      },
    ],
  },

  // Public auth routes
  { path: "signup", element: <SignUp /> },
  { path: "signin", element: <SignIn /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
