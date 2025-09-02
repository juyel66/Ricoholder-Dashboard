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

const doctor_routes = [
  {
    title: "Doctor Dashboard",
    url: "/Dashboard",
    icon: Home,
  },
  {
    title: "Appointments",
    url: "appointments",
    icon: BarChart2,
  },
];

const patient_routes = [
  {
    title: "Patient Dashboard",
    url: "/patient-dashboard",
    icon: Home,
  },
  {
    title: "Book Appointment",
    url: "/patient/book-appointment",
    icon: BarChart2,
  },
  {
    title: "My Appointments",
    url: "/patient/appointments",
    icon: CreditCard,
  },
];

const account_items = [
  {
    title: "Sign In",
    url: "/signIn",
    icon: BarChart2,
  },
  {
    title: "Sign Up",
    url: "/signup",
    icon: CustomIcon,
  },
];

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {/* Doctor Routes */}
          <p className="mt-5 ml-10 text-white mb-5 px-2 text-[17px]">
            DOCTOR ROUTES
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-3" />
          {doctor_routes.map((item) => (
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

          {/* Divider */}
          <div className="my-5 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          {/* Patient Routes */}
          <p className="mt-5 ml-10 text-white mb-5 px-2 text-[17px]">
            PATIENT ROUTES
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-3" />
          {patient_routes.map((item) => (
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

          {/* Account Pages */}
          <p className="mt-5 ml-10 text-white mb-5 px-2 text-[16px]">
            MANAGE ACCOUNT
          </p>
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
