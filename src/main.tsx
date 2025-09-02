import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./Component/Dashboard/DashboardPage";

import DashboardContent from "./Component/Dashboard/DashboardContent";

import SignUp from "./Component/Auth/SignUp";
import SignIn from "./Component/Auth/SignIn";

import DoctorDashboard from "./Component/Dashboard/Doctor/DoctorDashboard";

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
        path: "DoctorDashboard", // = /dashboard/signin
        element: <DoctorDashboard />,
      },
        {
        path: "DoctorDashboard", // = /dashboard/signin
        element: <DoctorDashboard />,
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
