import { SidebarTrigger } from "@/components/ui/sidebar";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

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
      <div className="navbar">
        <div className="navbar-start">
          <div className="lg:hidden">
            {" "}
            <SidebarTrigger />
          </div>

          <div>
            <p className="text-[#e3dcdcc9] lg:flex md:flex hidden">
              Pages <span className="text-white">/ {displayName} </span>
            </p>
            <p className="text-xl text-white ">{displayName}</p>
          </div>
        </div>

        <div className="navbar-end">
          <label className="input rounded-4xl w-[199px]  bg-[#0F1535] mr-2">
            <svg
              className="h-[1em] text-white opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              className="text-white  "
              type="search"
              required
              placeholder="Type here..."
            />
          </label>

          <div className="flex  items-center gap-2 ">
            <CgProfile className="text-xl lg:flex md:flex hidden text-white" />
            <Link to="/signIn" className="lg:text-xl lg:flex md:flex hidden text-white">
              Sign in
            </Link>
          </div>
          <IoSettingsOutline className="text-xl ml-2 text-white lg:flex md:flex hidden" />
          <MdOutlineNotifications className="text-xl ml-2 lg:flex md:flex hidden text-white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
