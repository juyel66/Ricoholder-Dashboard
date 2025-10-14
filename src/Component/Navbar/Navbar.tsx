import { SidebarTrigger } from "@/components/ui/sidebar";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import {  useLocation } from "react-router-dom";

const Navbar = () => {
  // const {pathname} = useLocation();
  // console.log(pathname)
  // const firstWord = pathname.split('/')[1];
  // console.log(firstWord);
  // const firstWordCapitalLetter = firstWord.charAt(0).toUpperCase() + firstWord.slice(1);


    const { pathname } = useLocation();


  const pathSegments = pathname.split("/").filter(Boolean); // removes empty strings
  const lastSegment = pathSegments[pathSegments.length - 1] || "Dashboard";

  // Convert to capitalized words
  const formatRouteName = (str: string) =>
    str
      .split("-") // in case route names have dashes
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const displayName = formatRouteName(lastSegment);


  return (
    <div>
      <div className="navbar p-0 border-b-2">
        <div className="navbar-start">
          <div className="lg:hidden">
            {" "}
            <SidebarTrigger />
          </div>

          <div>
            <p className="lg:flex md:flex hidden">
              Pages <span className="">/ {displayName} </span>
            </p>
            <p className="text-xl  ">{displayName}</p>
          </div>
        </div>

        <div className="navbar-end">

          <div className="flex items-center gap-4 pb-2 pt-2">
            <img className="h-15 w-15" src="https://res.cloudinary.com/dqkczdjjs/image/upload/v1760485758/Button_ivncwe.png" alt="" />
            <div>
              <p className="text-xl ">Admin User</p>
              <p>super admin</p>
            </div>
          </div>


          

          <div className="flex  items-center gap-2 ">
            <CgProfile className="text-xl lg:flex md:flex hidden text-white" />
            {/* <Link to="/signIn" className="lg:text-xl lg:flex md:flex hidden text-white">
              Sign in
            </Link> */}
          </div>
          <IoSettingsOutline className="text-xl ml-2 text-white lg:flex md:flex hidden" />
          <MdOutlineNotifications className="text-xl ml-2 lg:flex md:flex hidden text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
