import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleAuctionById, reset } from "../store/auction/auctionSlice";
import CountDownTimer from "../components/CountDownTimer";
import BidCard from "../components/BidCard";
import { placeABid } from "../store/bid/bidSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendNewBidNotification } from "../store/notification/notificationSlice";
import socket from "../socket";
import { getAllBidsForAuction } from "../store/bid/bidSlice";
import Loading from "../components/Loading";
import LiveHome from "../components/home/LiveHome";

const SingleAuctionDetail = ({ noPadding }) => {
  const [newBidAmount, setNewBidAmount] = useState("");
  const logInUser = JSON.parse(localStorage.getItem("user"));
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("description");
  const params = useParams();
  const dispatch = useDispatch();
  const { singleAuction } = useSelector((state) => state.auction);
  const { bids } = useSelector((state) => state.bid);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [singleAuctionData, setSingleAuctionData] = useState();
  //console.log((singleAuctionData, "singleAuctionData............"));
  const [auctionWinnerDetailData, setAuctionWinnerDetailData] = useState();
  const [bidsData, setBidsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const auctionStartTime = new Date(singleAuction?.startTime).getTime();
      const auctionEndTime = new Date(singleAuction?.endTime).getTime();

      if (
        currentTime >= auctionStartTime &&
        currentTime <= auctionEndTime &&
        !auctionStarted
      ) {
        setAuctionStarted(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [singleAuction?.startTime]);

  socket.on("winnerSelected", async (data) => {
    setAuctionStarted(false);

    setAuctionWinnerDetailData(data);
    
  });

  const handleWinner = () => {
    socket.emit("selectWinner", params?.id);
  };

  //console.log(params.id);
  //console.log(singleAuction);
  //console.log(isLoading);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([dispatch(getSingleAuctionById(params?.id))]).then(() => {
      setIsLoading(false);
    });
    dispatch(getAllBidsForAuction(params?.id));
  }, [params?.id]);

  //console.log("useEffect is running.new new....");
  socket.on("newBidData", async (data) => {
    //console.log(data, "newBidData,,,,,,,,,,,,,,,,,io,,,,,,io");
    setBidsData([
      {
        _id: new Date().getTime(),
        bidder: {
          fullName: data.fullName,
          profilePicture: data.profilePicture,
        },
        bidAmount: data.bidAmount,
        bidTime: data.bidTime,
        auction: data.auctionId,
      },
      ...bidsData,
    ]);

    
    setSingleAuctionData((prevState) => ({
      ...prevState,
      startingPrice: data.bidAmount,
    }));
    
    // handleNewBid()
  });
  useEffect(() => {
    //console.log("useEffect is running.new new bidsdata bidsdata bidsdata....");
  }, [bidsData]);

  useEffect(() => {
    setBidsData(bids);
    setSingleAuctionData(singleAuction);
  }, [bids, singleAuction]);

  useEffect(() => {
    socket.on("connect", () => {
      //console.log(`Client connected with the id: ${socket.id}`);
    });
    socket.emit("joinAuction", logInUser?._id);
    socket.on("newUserJoined", (data) => {
      
    });
  }, []);

  const placeBidHandle = async (e) => {
    e.preventDefault();
    //console.log((singleAuctionData, "singleAuctionData............"));
    if (user?.paymentVerified === false) {
      toast.info(
        "Please verify your payment method to place a bid. Go to settings..."
      );
    }
    let bidData = {
      id: params.id,
      amount: Math.floor(newBidAmount),
    };
    if (Math.floor(newBidAmount) <= singleAuctionData?.startingPrice) {
      toast.info("Bid amount should be greater than the currnt bid");
      //console.log(new Date().getTime() / 1000 + " seconds");
    } else if (singleAuction?.endTime < new Date().getTime() / 1000) {
      toast.info("Auction time is over");
    } else {
      dispatch(placeABid(bidData));
      setNewBidAmount("");
      // setSingleAuctionData(newBidAmount);

      socket.emit("newBid", {
        profilePicture: logInUser?.profilePicture,
        fullName: logInUser?.fullName,
        bidAmount: Math.floor(newBidAmount),
        bidTime: new Date().getTime(),
        auctionId: params.id,
      });

      await socket.emit("sendNewBidNotification", {
        auctionId: params.id,
        type: "BID_PLACED",
        newBidAmount: newBidAmount,
        fullName: logInUser?.fullName,
        id: logInUser?._id,
      });
      setActiveTab("bids");
      dispatch(
        sendNewBidNotification({
          auctionId: params.id,
          type: "BID_PLACED",
          newBidAmount: newBidAmount,
        })
      );
    }
  };
  if (isLoading) {
    return <Loading />;
  }

  // Rest of your code

  return (
    <>
      <div
        className={`flex place-content-between py-10 px-5 lg:py-20 lg:px-10 items-start gap-7 flex-wrap md:flex-nowrap ${noPadding ? "lg:py-0 px-0" : "p-4"}`}
        id="item01"
      >
        <div className="md:max-w-[45%] w-full">
          <img
            className="rounded-xl w-full h-[400px] object-cover shadow-lg"
            src={singleAuction?.image}
            alt="product image"
          />
        </div>
        <div className="w-full flex gap-6 flex-col bg-[#E8F5E9] p-6 rounded-xl shadow-lg">
          <div>
            <h2 className="text-3xl font-extrabold text-[#1B3D1B]">
              {singleAuction?.name}
            </h2>

            <div className="pt-4 flex flex-row gap-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-[#4CAF50] text-white font-medium">
                {singleAuction?.category?.name}
              </span>
              <span className="px-4 py-2 rounded-full bg-[#4CAF50] text-white font-medium">
                {singleAuction?.location?.name}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#4CAF50]">
            <div className="flex gap-8">
              <div className="text-[#1B3D1B]">
                <span className="font-medium capitalize">Seller</span>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={singleAuction?.seller?.profilePicture}
                    alt="avatar"
                    className="w-[50px] h-[50px] rounded-full object-cover border-2 border-[#4CAF50]"
                  />
                  <span className="font-medium text-[#1B3D1B]">
                    {singleAuction?.seller?.fullName}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                className={`px-5 py-2 rounded-xl font-bold transition-all ${
                  activeTab === "description"
                    ? "bg-[#4CAF50] text-white"
                    : "bg-white text-[#1B3D1B] border border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Details
              </button>
              <button
                className={`px-5 py-2 rounded-xl font-bold transition-all ${
                  activeTab === "bids"
                    ? "bg-[#4CAF50] text-white"
                    : "bg-white text-[#1B3D1B] border border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white"
                }`}
                onClick={() => setActiveTab("bids")}
              >
                Bids
              </button>
            </div>
          </div>

          <div>
            <div
              className={`pt-4 border-t border-[#4CAF50] ${
                activeTab === "description" ? "block" : "hidden"
              }`}
            >
              <h3 className="text-[#1B3D1B] font-medium text-xl mb-2">Description</h3>
              <p className="text-[#1B3D1B] leading-relaxed">
                {singleAuction?.description}
              </p>
            </div>

            <div
              className={`pt-4 border-t border-[#4CAF50] max-h-[250px] overflow-y-auto ${
                activeTab === "bids" ? "block" : "hidden"
              } no-scrollbar`}
            >
              {singleAuction?.bids?.length > 0 || bidsData.length > 0 ? (
                bidsData?.map((bid) => <BidCard key={bid._id} bid={bid} />)
              ) : (
                <h1 className="text-[#1B3D1B] text-center py-4">No bids yet</h1>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-[#4CAF50]">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1B3D1B] font-medium text-lg">
                  {singleAuction?.bids?.length > 0 ? "Current Bid" : "Starting Price"}
                </h3>
                <p className="text-[#4CAF50] font-bold text-xl">
                ₹{singleAuctionData?.startingPrice}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[#1B3D1B] font-medium text-lg">Time</h3>
                <p className="text-[#4CAF50] font-bold">
                  <CountDownTimer
                    startTime={singleAuction?.startTime}
                    endTime={singleAuction?.endTime}
                    id={singleAuction?._id}
                    Winner={handleWinner}
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-4 border-t border-[#4CAF50]">
            {singleAuction?.status === "over" || auctionWinnerDetailData ? (
              bidsData.length > 0 ? (
                <>
                  <div>
                    <h1 className="font-bold text-[#1B3D1B] text-xl mb-4">Winner</h1>
                    <div className="flex sm:gap-10 items-center border mt-2 justify-between md:w-[80%] py-3 px-4 md:px-6 border-[#4CAF50] rounded-xl bg-white">
                      <div className="flex gap-4 items-center">
                        <img
                          src={
                            auctionWinnerDetailData?.bidder?.profilePicture ||
                            singleAuction?.winner?.bidder?.profilePicture
                          }
                          alt="bidder profilePicture"
                          className="w-12 h-12 rounded-full border-2 border-[#4CAF50]"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#1B3D1B]">
                            {auctionWinnerDetailData?.bidder?.fullName ||
                              singleAuction?.winner?.bidder?.fullName}
                          </span>
                          <span className="text-sm text-[#4CAF50]">
                            {new Date(
                              auctionWinnerDetailData?.bidTime ||
                                singleAuction?.winner?.bidTime
                            ).toLocaleDateString()}{" "}
                            {""}
                            {`${new Date(
                              auctionWinnerDetailData?.bidTime ||
                                singleAuction?.winner?.bidTime
                            ).toLocaleTimeString()}`}
                          </span>
                        </div>
                      </div>
                      <div className="text-[#4CAF50] font-bold">
                      ₹{auctionWinnerDetailData?.bidAmount ||
                          singleAuction?.winner?.bidAmount}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <h1 className="text-[#1B3D1B] text-center py-4">No bids</h1>
              )
            ) : (
              auctionStarted && (
                <form
                  className="flex justify-between flex-wrap gap-4 items-center"
                  onSubmit={placeBidHandle}
                >
                  <input
                    type="number"
                    className="outline-none px-4 py-3 rounded-xl bg-white border-2 border-[#4CAF50] focus:border-[#2E7D32] transition-all text-[#1B3D1B] placeholder-[#4CAF50] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Enter your bid"
                    value={newBidAmount}
                    onChange={(e) => setNewBidAmount(e.target.value)}
                    required
                  />
                  {logInUser ? (
                    user?.paymentVerified ? (
                      <button
                        type="submit"
                        disabled={
                          singleAuction?.seller?._id === logInUser?._id
                            ? true
                            : false || !auctionStarted
                        }
                        className={`py-3 px-6 rounded-xl font-bold text-white transition-all ${
                          singleAuction?.seller?._id === logInUser?._id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#4CAF50] hover:bg-[#2E7D32]"
                        } ${
                          !auctionStarted
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#4CAF50] hover:bg-[#2E7D32]"
                        }`}
                      >
                        Place Bid
                      </button>
                    ) : (
                      <Link
                        to="/user-profile/payment-method"
                        className="bg-[#4CAF50] hover:bg-[#2E7D32] py-3 px-6 rounded-xl font-bold text-white transition-all"
                      >
                        Attach Payment Method to Bid
                      </Link>
                    )
                  ) : (
                    <Link
                      to="/login"
                      className="bg-[#4CAF50] hover:bg-[#2E7D32] py-3 px-6 rounded-xl font-bold text-white transition-all"
                    >
                      Place Bid
                    </Link>
                  )}
                </form>
              )
            )}
          </div>
        </div>
      </div>
      {/* <div className="mx-8">
        <LiveHome></LiveHome>
      </div> */}
    </>
  );
};

export default SingleAuctionDetail;
