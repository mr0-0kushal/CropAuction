import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reset } from "../store/auth/authSlice";
import { getAllAuctions } from "../store/auction/auctionSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleAuction from "../components/SingleAuction";
import SearchLocationCategory from "../components/SearchLocationCategory";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [auctionData, setAuctionData] = useState([]);

  const { auction, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auction
  );
  //console.log(auctionData);

  useEffect(() => {
    dispatch(getAllAuctions());
    //console.log("dispatched");
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setAuctionData(auction);
    } else if (isError) {
      toast.error(message);
    }
  }, [auction]);

  //pagination part
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(12);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = auctionData?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // 318f69a969db4f7599b7fbb5043e444e

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-b from-[#E8F5E9] to-white">
      <div className="bg-[#4CAF50] bg-opacity-5 py-6">
        <SearchLocationCategory />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto w-full px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#1B3D1B]">Active Auctions</h2>
            <div className="text-sm text-[#4CAF50]">
              {auctionData?.length || 0} items available
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {auctionData &&
              currentItems.map((item, index) => (
                <div key={index} className="h-full">
                  <SingleAuction
                    name={item?.name}
                    startingPrice={item?.startingPrice}
                    image={item?.image}
                    endTime={item?.endTime}
                    startTime={item?.startTime}
                    id={item?._id}
                    status={item?.status}
                    sellerImage={item?.seller?.profilePicture}
                    sellerName={item?.seller?.fullName}
                    sellerId={item?.seller?._id}
                    bidLength={item?.bids?.length}
                    winnerFullName={item?.winner?.bidder?.fullName}
                    winnerProfilePicture={item?.winner?.bidder?.profilePicture}
                    winnerBidAmount={item?.winner?.bidAmount}
                    winnerBidTime={item?.winner?.bidTime}
                  />
                </div>
              ))}
          </div>
          
          {auctionData && auctionData?.length !== 0 ? (
            <div className="mt-8">
              <Pagination
                totalPosts={auctionData?.length}
                postsPerPage={itemsPerPage}
                paginate={paginate}
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-[#1B3D1B]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#8BC34A] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">No Auctions Available</h3>
              <p className="text-[#4CAF50]">Check back later for new items</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
