import { Home, BarChart2, CreditCard, LogOut, Medal, ChartScatter, SquareChartGantt, ReceiptCent, TableProperties, Megaphone, School, CircleQuestionMark, UserRoundPen } from "lucide-react";
import { CgProfile } from "react-icons/cg";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

import CustomIcon from "@/Component/customIcons/customIcons";
import { NavLink } from "react-router-dom";
// import { getCurrentUser, logoutUser } from "@/Component/Auth/AuthFuction";

const doctor_routes = [
  { title: "Dashboard", url: "/admin-dashboard", icon: Home },
  { title: "Properties", url: "/properties", icon: BarChart2 },
  { title: "Agent", url: "/agent", icon: CgProfile },
  { title: "Media Library", url: "/media-library", icon: Medal },
  { title: "Analytics", url: "/analytics", icon: ChartScatter },
  { title: "Activity Logs", url: "/activity-logs", icon: SquareChartGantt },

];

const patient_routes = [
  { title: "Properties-Rentals", url: "/properties-rentals", icon: ReceiptCent },
  { title: "Properties-sales", url: "/properties-sales", icon: CreditCard },
  { title: "Calendars", url: "/calendars", icon: TableProperties },
  { title: "Announcements", url: "/announcements", icon: Megaphone },
  { title: "Resources", url: "/resources", icon: School },
  { title: "FAQs", url: "/faqs", icon: CircleQuestionMark },
  { title: "Profile", url: "/profile", icon: UserRoundPen },

];

const AppSidebar = () => {
  // const navigate = useNavigate();
  // const currentUser = getCurrentUser();
  // const role = currentUser?.user?.role;
  const role = "AGENT";

  const routesToRender =
    role === "ADMIN" ? doctor_routes : role === "AGENT" ? patient_routes : [];  

  // const handleLogout = () => {
  //   logoutUser();
  //   navigate("/signin");
  // };

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
                          <item.icon />
                          <span>{item.title}</span>
                        </div>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
              <div className="my-5 mt-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <SidebarMenuItem>
                <SidebarMenuButton  className="cursor-pointer hover:bg-gray-800 rounded-md">
                  <div className="flex items-center gap-2  text-white">
                    <LogOut />
                    <span>Logout</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}

          {!role &&
            [
              { title: "Sign In", url: "/signin", icon: BarChart2 },
              { title: "Sign Up", url: "/signup", icon: CustomIcon },
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
                        <item.icon />
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










// import { Home, BarChart2, CreditCard, LogOut, Medal, ChartScatter, SquareChartGantt, ReceiptCent, TableProperties, Megaphone, School, CircleQuestionMark, UserRoundPen } from "lucide-react";
// import { CgProfile } from "react-icons/cg";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "./ui/sidebar";


// import { NavLink } from "react-router-dom";

// const admin_routes = [
//   { title: "Dashboard", url: "/admin-dashboard", icon: Home },
//   { title: "Properties", url: "/properties", icon: BarChart2 },
//   { title: "Agent", url: "/agent", icon: CgProfile },
//   { title: "Media Library", url: "/media-library", icon: Medal },
//   { title: "Analytics", url: "/analytics", icon: ChartScatter },
//   { title: "Activity Logs", url: "/activity-logs", icon: SquareChartGantt },
// ];

// const agent_routes = [
//   { title: "Properties-Rentals", url: "/properties-rentals", icon: ReceiptCent },
//   { title: "Properties-Sales", url: "/properties-sales", icon: CreditCard },
//   { title: "Calendars", url: "/calendars", icon: TableProperties },
//   { title: "Announcements", url: "/announcements", icon: Megaphone },
//   { title: "Resources", url: "/resources", icon: School },
//   { title: "FAQs", url: "/faqs", icon: CircleQuestionMark },
//   { title: "Profile", url: "/profile", icon: UserRoundPen },
// ];

// const AppSidebar = () => {
//   const routesToRender = [...admin_routes, ...agent_routes]; // merge both

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarMenu>
//           <p className="mt-5 ml-10 text-white mb-5 px-2 text-[24px]">
//             ADMIN & AGENT
//           </p>
//           <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent mb-3" />

//           {routesToRender.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <NavLink to={item.url}>
//                 {({ isActive }) => (
//                   <SidebarMenuButton
//                     asChild
//                     isActive={isActive}
//                     className={`p-0 ${
//                       isActive
//                         ? " text-black rounded-md"
//                         : "text-white hover:bg-gray-800 rounded-md"
//                     }`}
//                   >
//                     <div className="flex items-center gap-2 w-full h-full p-2">
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </div>
//                   </SidebarMenuButton>
//                 )}
//               </NavLink>
//             </SidebarMenuItem>
//           ))}

//           <div className="my-5 mt-10 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

//           <SidebarMenuItem>
//             <SidebarMenuButton className="cursor-pointer hover:bg-gray-800 rounded-md">
//               <div className="flex items-center gap-2 text-white">
//                 <LogOut />
//                 <span>Logout</span>
//               </div>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarContent>
//     </Sidebar>
//   );
// };

// export default AppSidebar;
