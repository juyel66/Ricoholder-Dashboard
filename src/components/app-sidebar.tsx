import { Home, BarChart2, CreditCard, LogOut } from "lucide-react";      
import { CgProfile } from "react-icons/cg";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import CustomIcon from "@/Component/customIcons/customIcons";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/Component/Auth/AuthFuction";

const doctor_routes = [
  { title: "Appointments List", url: "/appointment-list", icon: Home },
  { title: "Appointment Manage", url: "/appointment-management", icon: BarChart2 },
  { title: "Doctor Profile", url: "/doctor-profile", icon: CgProfile },
];

const patient_routes = [
  { title: "Patient Dashboard", url: "/patient-dashboard", icon: Home },
  { title: "My Appointments", url: "/my-appointments", icon: CreditCard },
  { title: "Patient Profile", url: "/patient-profile", icon: CgProfile }, 
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const role = currentUser?.user?.role;

  const routesToRender =
    role === "DOCTOR" ? doctor_routes : role === "PATIENT" ? patient_routes : [];

  const handleLogout = () => {
    logoutUser();
    navigate("/signin");
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {role && (
            <>
              <p className="mt-5 ml-10 text-white mb-5 px-2 text-[24px]">
                {role === "DOCTOR" ? "DOCTOR" : "PATIENT"}
                
                
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
              {/* Logout button */}
              <div className="my-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="cursor-pointer">
                  <div className="flex items-center gap-2 text-white">
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {/* Account Pages - only show if no user logged in */}
          {!role &&
            [
              { title: "Sign In", url: "/signin", icon: BarChart2 },
              { title: "Sign Up", url: "/signup", icon: CustomIcon },
            ].map((item) => (
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
