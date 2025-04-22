import { Link } from "react-router-dom";
import CountDownTimer from "../components/CountDownTimer";
import { useState } from "react";
import { RiShoppingBagFill } from "react-icons/ri";
import { BsCurrencyDollar } from "react-icons/bs";
import socket from "../socket";
// eslint-disable-next-line react/prop-types
const SingleAuction = ({
  name,
  startingPrice,
  image,
  endTime,
  startTime,
  id,
  status,
  sellerImage,
  sellerName,
  sellerId,
  winnerFullName,
  bidLength,
  winnerProfilePicture,
  winnerBidAmount,
  winnerBidTime,
}) => {
  const [statusData, setStatusData] = useState(status);

  socket.on("setStatus", async () => {
    await setStatusData("over");
    ////console.log("handlewinner func in dashboard.,,,,,,,,,,");
  });

  const logInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="h-full justify-between bg-white rounded-xl flex flex-col p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-[#E8F5E9]">
      <div>
        <div className="w-full rounded-xl relative bg-[#F5F5F5] overflow-hidden group">
          <img
            className="w-full h-[280px] rounded-lg object-cover group-hover:scale-105 transition-all duration-500"
            src={image}
            alt="item image"
          />
          <div className="absolute bottom-3 right-3 border border-[#4CAF50] rounded-full py-1.5 px-4 text-sm bg-white text-[#1B3D1B] shadow-md">
            <CountDownTimer
              startTime={startTime}
              endTime={endTime}
              status={status}
              id={id}
            />
          </div>
        </div>
        <h3 className="my-3 text-xl font-semibold text-[#1B3D1B]">{name}</h3>
      </div>
      <div>
        <div className="flex justify-start items-center">
          <div className="border-2 border-[#E8F5E9] rounded-full p-0.5">
            <img
              src={sellerImage}
              className="w-10 h-10 rounded-full object-cover"
              alt="seller image"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-[#2E7D32]">{sellerName}</h3>
          </div>
        </div>
        {statusData === "over" ? (
          <div className="flex justify-between items-center my-3 pt-3 border-t border-[#E8F5E9]">
            <Link
              to={`/single-auction-detail/${id}`}
              className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white text-sm font-medium rounded-xl py-2.5 w-full text-center no-underline transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Details
            </Link>
          </div>
        ) : (
          <div className="flex justify-between items-center my-3 pt-3 border-t border-[#E8F5E9]">
            <div className="flex flex-col">
              <p className="text-sm text-[#4CAF50]">Current Bid</p>
              <p className="mt-1 text-lg font-semibold text-[#1B3D1B] flex items-center">
                <BsCurrencyDollar size={18} className="mr-1" />
                {startingPrice}
              </p>
            </div>
            <Link
              to={`/single-auction-detail/${id}`}
              className={`flex items-center gap-2 text-white text-sm font-medium rounded-xl px-5 py-2.5 transition-all duration-300 ${
                sellerId === logInUser?._id
                  ? "bg-[#C8E6C9] text-[#2E7D32] hover:bg-[#A5D6A7]"
                  : "bg-[#4CAF50] hover:bg-[#2E7D32]"
              }`}
            >
              <BsCurrencyDollar size={18} />
              Place Bid
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleAuction;
