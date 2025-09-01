import { Home } from "lucide-react";      
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import { BarChart2, CreditCard } from "lucide-react";

import CustomIcon from "@/Component/customIcons/customIcons";
import { NavLink } from "react-router-dom"; // NavLink import

const menu_items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home, 
  },
  {
    title: "Tables",
    url: "/tables",
    icon: BarChart2,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: CreditCard,
  },
  {
    title: "RTL",
    url: "/RTL",
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
          <p className="mt-5 ml-10 text-white mb-5 px-2 text-[17px]">
            VISION UI FREE
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          {menu_items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? "text-white bg-[#1A1F37] rounded-xl w-full p-2"  : "text-white"}`
                  }
                >
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <p className="mt-5 text-white mb-5 px-2 text-[16px]">
            ACCOUNT PAGES
          </p>

          {account_items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    `flex items-center gap-2 ${isActive ? "text-white bg-[#1A1F37] rounded-xl w-full p-2" : "text-white"}`
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
