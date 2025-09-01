import { FaArrowRight } from "react-icons/fa6";

const DashboardCard = () => {
  return (
    <div>
      <div className="lg:flex gap-5">


        <div
          style={{ backgroundImage: "url(/images/background.png)" }}
          className="bg-no-repeat bg-cover   h-[344px] rounded-2xl  text-white p-5 w-full"
        >
          <div>
            <p className="text-[#A0AEC0]">Welcome back,</p>
            <p className="text-4xl">Mark Johnson</p>
            <p className="text-[#A0AEC0]">
              Glad to see you again! <br /> Ask me anything.
            </p>
          </div>

          <div className="flex items-center gap-3 mt-40 ">
            <p>Tap to record</p>
            <FaArrowRight />
          </div>
        </div>



        <div
          style={{
            background:
              "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(14, 21, 58, 0.71) 91.2%)",
          }}
          className=" bg-no-repeat bg-cover lg:mt-0 mt-5  h-[344px] rounded-2xl  text-white p-5 w-full"
        >


                      <div className="flex justify-between p-4 ">
              <p className="text-4xl mt-2 ">Referral Tracking</p>
              <div className="mr-10  mt-5">
                <img
                  className="bg-gray-800 p-3 rounded-[10px] "
                  src="https://i.ibb.co.com/DH38qmHC/Vector.png"
                  alt=""
                />
              </div>
            </div>



          <div className="flex justify-between items-center ">
            <div className=" p-5">
              <div className=" w-40 p-2  bg-[linear-gradient(126.97deg,#060C29_28.26%,rgba(4,12,48,0.5)_91.2%)] h-20 rounded-xl">
                <div>
                  <p className="text-[#A0AEC0]">Invited People</p>
                  <p className="text-2xl">145 People</p>
                </div>
              </div>
              <div className=" mt-5 w-40 p-2  bg-[linear-gradient(126.97deg,#060C29_28.26%,rgba(4,12,48,0.5)_91.2%)]  h-20 rounded-xl">
                <div>
                  <p className="text-[#A0AEC0]">Bonus</p>
                  <p className="text-2xl">1,465</p>
                </div>
              </div>
            </div>

            <div className=" pr-10 mb-5 ">
              <div>
                <div
                  className="radial-progress text-[#05CD99] flex items-center justify-center text-center"
                  style={
                    {
                      "--value": 70,
                      "--size": "120px",
                      "--thickness": "12px",
                      transform: "rotate(180deg)",
                      backgroundColor: "transparent",
                    } as React.CSSProperties
                  }
                  aria-valuenow={70}
                  role="progressbar"
                >
                  <div className="-rotate-180 text-white">
                    <p className="text-xs opacity-80">Safety</p>
                    <span className="text-2xl font-bold leading-none">9.3</span>
                    <p className="text-xs opacity-80">Total Score</p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex lg:hidden  pr-10">
              <div>
                <div
                  className="radial-progress text-[#05CD99] flex items-center justify-center text-center"
                  style={
                    {
                      "--value": 70,
                      "--size": "150px",
                      "--thickness": "12px",
                      transform: "rotate(180deg)",
                      backgroundColor: "transparent",
                    } as React.CSSProperties
                  }
                  aria-valuenow={70}
                  role="progressbar"
                >
                  <div className="-rotate-180 text-white">
                    <p className="text-xs opacity-80">Safety</p>
                    <span className="text-2xl font-bold leading-none">9.3</span>
                    <p className="text-xs opacity-80">Total Score</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        


      </div>
    </div>
  );
};

export default DashboardCard;
