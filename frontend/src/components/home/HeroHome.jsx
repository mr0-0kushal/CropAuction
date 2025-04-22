import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import herovector from "../../assets/heroimg.png";
import { RiFindReplaceLine } from "react-icons/ri";
const HeroHome = () => {
  const logInUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="lg:h-[85vh] py-20 p-5 lg:px-12 flex items-center justify-center flex-wrap lg:flex-nowrap gap-5 text-[#1B3D1B] bg-white relative overflow-hidden">
        {/* Background gradient circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="w-[300px] h-[300px] bg-[#E8F5E9] rounded-full blur-[150px] absolute left-[-50px] top-[-80px]"></div>
          <div className="w-[200px] h-[200px] bg-[#8BC34A] rounded-full blur-[150px] absolute left-[45%] top-[100px]"></div>
          <div className="w-[250px] h-[250px] bg-[#4CAF50] rounded-full blur-[150px] absolute right-[50px] bottom-[80%] lg:bottom-[70%]"></div>
        </div>

        {/* Content */}
        <div className="w-full flex flex-col gap-4 z-[1] max-w-[600px]">
          <h3 className="tracking-wider text-[#4CAF50] font-bold">🌱 DISCOVER, BID, AND SELL</h3>
          <h1 className="text-5xl font-bold text-[#1B3D1B]">
            Fresh Crops. Real-Time Auctions. Fair Prices.
          </h1>
          <p className="text-[#1B3D1B]">
            At BidMyCrop, experience the power of live, transparent crop trading. Whether you're a buyer looking for quality produce or a farmer ready to sell, our real-time auction system brings the market to your fingertips.
          </p>
          <div className="flex gap-4">
            <Link
              className="hover:scale-105 flex border border-[#4CAF50] px-5 py-3 mt-2 rounded-xl text-[#4CAF50] cursor-pointer font-bold tracking-wide hover:bg-[#E8F5E9] transition-all duration-200 w-fit"
              to="/"
            > 
              <div className="flex items-center gap-2">
                <RiFindReplaceLine />
                <span>Explore More </span>
              </div>
            </Link>
            <Link
              className="hover:scale-105 flex bg-[#4CAF50] px-5 py-3 mt-2 rounded-xl text-white cursor-pointer font-bold tracking-wide hover:bg-[#2E7D32] transition-all duration-200 w-fit"
              to={logInUser ? "/" : "/"}
            > 
              <div className="flex items-center gap-2">
                <span>Create Now </span>
                <FaArrowRightLong />
              </div>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full lg:p-20 animate-float relative z-[1] flex justify-center items-center">
          <img 
            src={herovector} 
            alt="Hero-img" 
            className="w-full h-auto max-w-[600px] mx-auto object-contain"
            style={{
              maxHeight: '500px',
              objectFit: 'contain',
              objectPosition: 'center'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HeroHome;
