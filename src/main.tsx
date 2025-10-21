// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";

// import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
// import DashboardPage from "./Component/Dashboard/DashboardPage";


// import SignUp from "./Component/Auth/SignUp";
// import SignIn from "./Component/Auth/SignIn";

// import AppointmentList from "./Component/Dashboard/Doctor/AppointmentList";
// import Appointments from "./Component/Dashboard/Doctor/Appointments";
// import PatientDashboard from "./Component/Dashboard/Patient/PatientDashboard";
// import MyAppointments from "./Component/Dashboard/Patient/MyAppointments";
// import PatientProfile from "./Component/Dashboard/Patient/PatientProfile";

// import { getCurrentUser } from "./Component/Auth/AuthFuction";
// import DoctorProfile from "./Component/Dashboard/Doctor/DoctorProfile";

// // Protected Route wrapper
// const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
//   const currentUser = getCurrentUser();

//   if (!currentUser) {
//     return <Navigate to="/signin" replace />;
//   }

//   if (!allowedRoles.includes(currentUser.user.role)) {
//     // role mismatch
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// // Default redirect based on role
// const DefaultDashboardRedirect = () => {
//   const currentUser = getCurrentUser();
//   if (!currentUser) return <Navigate to="/signin" replace />;

//   if (currentUser.user.role === "DOCTOR") return <Navigate to="/appointment-list" replace />;
//   if (currentUser.user.role === "PATIENT") return <Navigate to="/patient-dashboard" replace />;

//   return <Navigate to="/signin" replace />;
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <DashboardPage />,
//     children: [
//       {
//         index: true,
//         element: <DefaultDashboardRedirect />, // redirect user based on role
//       },

//       // Doctor routes
//       {
//         element: <ProtectedRoute allowedRoles={["DOCTOR"]} />,
//         children: [
//           { path: "appointment-list", element: <AppointmentList /> },
//           { path: "appointment-management", element: <Appointments /> },
//           { path: "doctor-profile", element: <DoctorProfile /> },
//         ],
//       },

//       // Patient routes
//       {
//         element: <ProtectedRoute allowedRoles={["PATIENT"]} />,
//         children: [
//           { path: "patient-dashboard", element: <PatientDashboard /> },
//           { path: "my-appointments", element: <MyAppointments /> },
//           { path: "patient-profile", element: <PatientProfile /> },
//         ],
//       },
//     ],
//   },

//   // Public auth routes
//   { path: "signup", element: <SignUp /> },
//   { path: "signin", element: <SignIn /> },
// ]);

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );












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

// Auth/API-related imports removed or commented out.
// import { getCurrentUser } from "./Component/Auth/AuthFuction"; 
import DoctorProfile from "./Component/Dashboard/Doctor/DoctorProfile";
import Properties from "./Component/Admin/Properties/AdminPropertiesRentals";
import AdminDashboard from "./Component/Admin/AdminDashboard/AdminDashboard";
import Agent from "./Component/Admin/Agent/Agent";
import MediaLibrary from "./Component/Admin/MediaLibrary/MediaLibrary";
import Analytics from "./Component/Admin/Analytics/Analytics";
import ActivityLogs from "./Component/Admin/ActivityLogs/ActivityLogs";
// import PropertiesRentals from "./Component/Agent/PropertiesRentals/PropertiesRentals";
import PropertiesSales from "./Component/Agent/PropertiesSales/PropertiesSales";
import Calendars from "./Component/Agent/Calendars/Calendars";
import { MdAnnouncement } from "react-icons/md";
import Resources from "./Component/Agent/Resources/Resources";
import FAQs from "./Component/Agent/FaQs/FAQs";
import Profile from "./Component/Agent/Profile/Profile";
import Announcements from "./Component/Agent/Announcements/Announcements";
import CreateProperty from "./Component/Admin/Properties/CreateProperty";
import ManageProperties from "./Component/Admin/Agent/ManageProperties";
import PropertiesRentalsDetails from "./Component/Agent/PropertiesRentals/PropertiesRentalsDetails";
import PropertiesRentals from "./Component/Agent/PropertiesSales/PropertiesRentals";
import AdminPropertiesSales from "./Component/Agent/PropertiesSales/AdminPropertiesSales";
import AdminPropertiesRentals from "./Component/Admin/Properties/AdminPropertiesRentals";

// Protected Route wrapper - API functionality removed
// Now acts as a simple wrapper (pass-through) for the children routes.
// To fully remove the Auth functionality, we are hardcoding the access.
const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  // NOTE: All API/Auth logic has been removed. 
  // For a purely structural setup, we just return the Outlet.
  // In a real app, this would contain the actual auth check.
  
  // Example of hardcoding a role for testing the layout:
  // const isAuthenticated = true; 
  // if (!isAuthenticated) return <Navigate to="/signin" replace />;

  return <Outlet />;
};

// Default redirect based on role - API functionality removed
const DefaultDashboardRedirect = () => {
  // NOTE: All API/Auth/Role logic has been removed.
  // We will simply redirect to a default public path (e.g., signin) 
  // or a common dashboard for structural integrity.

  // For this example, let's redirect to a common path or signin.
  return <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <DefaultDashboardRedirect />, // redirect user based on a dummy check
      },

      // Admin routes
      {
        // ProtectedRoute is a structural element now, no auth check
        element: <ProtectedRoute allowedRoles={["ADMIN"]} />,
        children: [
          { path: "admin-dashboard", element: <AdminDashboard /> },
          { path: "admin-properties-rentals", element: <AdminPropertiesRentals /> },
          { path: "admin-properties-sales", element: <AdminPropertiesSales /> },
          { path: "admin-agent", element: < Agent/> },
          { path: "admin-media-library", element: < MediaLibrary/> },
          { path: "admin-analytics", element: < Analytics/> },
          { path: "admin-activity-logs", element: < ActivityLogs/> },
          {path:"admin-create-property", element:< CreateProperty />},
          {path:"admin-manage-property", element:<ManageProperties />},
          
        ],
      },

      // Agent routes
      {
        // ProtectedRoute is a structural element now, no auth check
        element: <ProtectedRoute allowedRoles={["AGENT"]} />,
        children: [
          // { path: "properties-rentals", element: <PropertiesRentals /> },
          { path: "agent-properties-rentals", element: <PropertiesRentals /> },
           { path: "agent-properties-sales", element: <PropertiesSales /> },
          { path: "agent-calendars", element: <Calendars /> },
          { path: "agent-announcements", element: <Announcements /> },
          { path: "agent-resources", element: <Resources /> },
          { path: "agent-faqs", element: <FAQs /> },
      
          { path: "agent-profile", element: <Profile /> },
          { path: "agent-property-rentals-details", element: <PropertiesRentalsDetails/> },
        ],
      },
    ],
  },

  // Public auth routes (kept for navigation structure)
  { path: "signup", element: <SignUp /> },
  { path: "signin", element: <SignIn /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <div className="pl-2 pr-2"> <RouterProvider router={router} /></div>
  </StrictMode>
);