// import Charts from "./Charts";
// import DashboardCard from "./DashboardCard";
// import DashboardTables from "./DashboardTables";
// import TodaysCard from "./TodaysCard";

import { getCurrentUser } from "../Auth/AuthFuction";

const DashboardContent = () => {

  const currentUser = getCurrentUser();
  console.log('currentUser is: ', currentUser);
  return (
   <div>
    {/* <TodaysCard></TodaysCard> */}
    <div className="mt-5">
        {/* <DashboardCard></DashboardCard> */}
    </div>
    <div>
      {/* <Charts></Charts> */}
    </div>
    <div>
      {/* <DashboardTables></DashboardTables> */}
    </div>

    {/* <div className="flex justify-end items-end gap-5 mt-10 pb-5 pr-4 text-white ">
      <p className="cursor-pointer ">Marketplace</p>
      <p className="cursor-pointer">Blog</p>
      <p className="cursor-pointer">License</p>
    </div> */}

    Dashboard



   </div>
  );
};

export default DashboardContent;
