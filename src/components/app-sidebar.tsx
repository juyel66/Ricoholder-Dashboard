import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { LogOut } from "lucide-react";

const doctor_routes = [
  { title: "Dashboard", url: "/admin-dashboard", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835665/Icon_5_syy9ka.png" },
  { title: "Properties-Rentals", url: "/properties-rentals", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835665/Icon_6_zia1hb.png" },
   { title: "Properties-Sales", url: "/properties-sales", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836092/Icon_13_cnv9is.png" },
  { title: "Agent", url: "/agent", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835907/Icon_12_hrpcfu.png" },
  { title: "Media Library", url: "/media-library", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835779/Icon_9_v2svx7.png" },
  { title: "Analytics", url: "/analytics", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835778/Icon_10_pwt0qy.png" },
  { title: "Activity Logs", url: "/activity-logs", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835766/Icon_11_w8rapr.png" },
];

const patient_routes = [
  { title: "Properties-Rentals", url: "/properties-rentals", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760835665/Icon_5_syy9ka.png" },
  { title: "Properties-sales", url: "/properties-sales", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836092/Icon_13_cnv9is.png" },
  { title: "Calendars", url: "/calendars", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836465/Icon_16_yxcamk.png" },
  { title: "Announcements", url: "/announcements", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836463/Icon_17_ar9tl8.png" },
  { title: "Resources", url: "/resources", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836670/Icon_18_duc2wu.png" },
  { title: "FAQs", url: "/faqs", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836607/Icon_19_wiysfq.png" },
  { title: "Profile", url: "/profile", img: "https://res.cloudinary.com/dqkczdjjs/image/upload/v1760836746/Icon_20_hv1hl4.png" },
];

const AppSidebar = () => {
  const role = "ADMIN";

  const routesToRender =
    role === "ADMIN" ? doctor_routes : role === "AGENT" ? patient_routes : [];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {role && (
            <>
              <p className="mt-5 ml-10 text-white mb-5 px-2 text-[24px]">
                {role === "ADMIN" ? "ADMIN" : "AGENT"}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-3" />
              {routesToRender.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`p-0 ${
                          isActive
                            ? " text-black rounded-md"
                            : "text-white hover:bg-gray-800 rounded-md"
                        }`}
                      >
                        <div className="flex items-center gap-2 w-full h-full p-2">
                          <img src={item.img} alt={item.title} className="w-5 h-5" />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
              <div className="my-5 mt-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <SidebarMenuItem>
                <SidebarMenuButton className="cursor-pointer hover:bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2 text-white">
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {!role &&
            [
              { title: "Sign In", url: "/signin", img: "https://example.com/signin.png" },
              { title: "Sign Up", url: "/signup", img: "https://example.com/signup.png" },
            ].map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.url}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`p-0 ${
                        isActive
                          ? " text-black rounded-md"
                          : "text-white hover:bg-gray-800 rounded-md"
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full h-full p-2">
                        <img src={item.img} alt={item.title} className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
