

const TodaysCard = () => {
    return (
        <div>
             <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5  ">

        {/* img 1 */}
      <div
        style={{ backgroundImage: "url(/images/rec.png)" }}
        className="flex items-center justify-between  p-2 w-full rounded-xl  bg-no-repeat bg-cover "
      >
        <div className=" h-[80px] ">
          <p className=" text-[#A0AEC0] lg:text-xl  ">Today's Money</p>
          <div>
            <p className="text-white lg:text-3xl md:text-2xl text-xl">
              {" "}
              $53,000<span className="text-[#01B574]">+55%</span>
            </p>
          </div>
        </div>
        <img className=""  src="https://i.ibb.co.com/7tJhDX4x/Icon.png" alt="" />
      </div>
        {/* img 2 */}
      <div
        style={{ backgroundImage: "url(/images/rec.png)" }}
        className="flex items-center justify-between  p-2 w-full rounded-xl  bg-no-repeat bg-cover "
      >
        <div className=" h-[80px] ">
          <p className=" text-[#A0AEC0] lg:text-xl ">Today's Users</p>
          <div>
            <p className="text-white lg:text-3xl md:text-2xl text-xl">
              {" "}
              $2,300<span className="text-[#01B574]">+5%</span>
            </p>
          </div>
        </div>
        <img className=""  src="https://i.ibb.co.com/93WXTX8s/earth-Icons.png" alt="" />
      </div>
        {/* img 3 */}
           <div
        style={{ backgroundImage: "url(/images/rec.png)" }}
        className="flex items-center justify-between  p-2 w-full rounded-xl  bg-no-repeat bg-cover "
      >
        <div className=" h-[80px] ">
          <p className=" text-[#A0AEC0] lg:text-xl  ">New Clients</p>
          <div>
            <p className="text-white lg:text-3xl md:text-2xl text-xl">
              {" "}
              $3,052<span className="text-[#cc1818]">-14%</span>
            </p>
          </div>
        </div>
        <img className=""  src="https://i.ibb.co.com/cXXgSgbQ/Book-Icons.png" alt="" />
      </div>
        {/* img 4 */}
            <div
        style={{ backgroundImage: "url(/images/rec.png)" }}
        className="flex items-center justify-between   p-2 w-full rounded-xl  bg-no-repeat bg-cover "
      >
        <div className=" h-[80px] ">
          <p className=" text-[#A0AEC0] lg:text-xl ">Total sales</p>
          <div>
            <p className="text-white lg:text-3xl md:text-2xl text-xl">
              {" "}
              $173,000<span className="text-[#01B574]">+8%</span>
            </p>
          </div>
        </div>
        <img className=""  src="https://i.ibb.co.com/MDcyxX6j/BuyIcons.png" alt="" />
      </div>





    </div>
            
        </div>
    );
};

export default TodaysCard;