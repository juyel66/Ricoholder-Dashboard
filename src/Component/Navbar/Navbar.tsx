import { SidebarTrigger } from "@/components/ui/sidebar";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotifications, MdSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";


const Navbar = () => {
  const { pathname } = useLocation();

  const isAdmin = pathname.includes("/admin");
  const isAgent = pathname.includes("/agent");

  console.log("locations", pathname)

  const userInfo = isAdmin
    ? { name: "Admin User", role: "Super Admin" }
    : { name: "Md Juyel Rana", role: "Agent" };

  return (
    <div>
      <div className="navbar p-0 border-b-2">
        <div className="navbar-start">
          <div className="lg:hidden">
            <SidebarTrigger />
          </div>

          

          <div className="relative w-full">
            <MdSearch className="absolute left-3 top-1/2 w-7 h-7 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              placeholder="Search properties, agents, or listings..."
              type="text"
              className="w-full h-10 pl-10 pr-5 rounded-[10px] border-2 border-gray-300"
            />
          </div>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-4 pb-2 pt-2">
            {/* <img
              className="h-15 w-15"
              src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760485758/Button_ivncwe.png"
              alt="user"
            /> */}
         <div className="text-4xl mb-2 ">
             <IoMdNotificationsOutline />
         </div>


            <div>
              <p className="text-xl">{userInfo.name}</p>
              <p className="text-gray-500">{userInfo.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <CgProfile className="text-xl lg:flex md:flex hidden text-white" />
          </div>
          <IoSettingsOutline className="text-xl ml-2 text-white lg:flex md:flex hidden" />
          <MdOutlineNotifications className="text-xl ml-2 lg:flex md:flex hidden text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
