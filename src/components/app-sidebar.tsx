import { Home, BarChart2, CreditCard } from "lucide-react";      
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import CustomIcon from "@/Component/customIcons/customIcons";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "@/Component/Auth/AuthFuction"; // auth helper

const doctor_routes = [
  { title: "Appointments List", url: "/appointment-list", icon: Home },
  { title: "Appointment Manage", url: "/appointment-management", icon: BarChart2 },
];

const patient_routes = [
  { title: "Patient Dashboard", url: "/patient-dashboard", icon: Home },
  { title: "My Appointments", url: "/my-appointments", icon: CreditCard },
  { title: "Patient Profile", url: "/patient-profile", icon: CreditCard },
];

const account_items = [
  { title: "Sign In", url: "/signIn", icon: BarChart2 },
  { title: "Sign Up", url: "/signup", icon: CustomIcon },
];

const AppSidebar = () => {
  const currentUser = getCurrentUser(); // get logged-in user
  const role = currentUser?.user?.role;

  // Show routes based on role
  const routesToRender =
    role === "DOCTOR" ? doctor_routes : role === "PATIENT" ? patient_routes : [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {role && (
            <>
              <p className="mt-5 ml-10 text-white mb-5 px-2 text-[17px]">
                {role === "DOCTOR" ? "DOCTOR ROUTES" : "PATIENT ROUTES"}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-3" />
              {routesToRender.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton>
                    <NavLink
                      to={item.url}
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${
                          isActive
                            ? "text-white bg-[#1A1F37] rounded-xl w-full p-2"
                            : "text-white"
                        }`
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </>
          )}

          {/* Account Pages */}
          <p className="mt-5 ml-10 text-white mb-5 px-2 text-[16px]">MANAGE ACCOUNT</p>
          {account_items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${
                      isActive
                        ? "text-white bg-[#1A1F37] rounded-xl w-full p-2"
                        : "text-white"
                    }`
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
