import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import { getBidsAuctionsByUser } from "../store/bid/bidSlice";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import Loading from "./Loading";
import Pagination from "./Pagination";

const BidsItem = () => {
  const dispatch = useDispatch();
  const { bids , isLoading} = useSelector((state) => state.bid);
  const {user}=useSelector(state=>state.auth)
  //console.log(bids, "bids....");
  useEffect(() => {
    dispatch(getBidsAuctionsByUser());
    //console.log("use effecty bids....", bids);
  }, []);


  //pagination part
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setitemsPerPage] = useState(6)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bids?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }
  const prevPage = () => {
    setCurrentPage(currentPage-1)
  }
  const nextPage = () => {
    setCurrentPage(currentPage+1)
  }

  return (
    <div className="overflow-auto px-7 py-4 w-full bg-[#E8F5E9] text-[#1B3D1B] rounded-2xl">
      <h2 className="font-bold text-xl border-b border-[#4CAF50] pb-3 mb-5">
        Bids Items
      </h2>
      <div className="overflow-auto no-scrollbar px-4 bg-white rounded-2xl max-h-[750px] border border-[#4CAF50]">
        <table className="relative text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
          <thead className="sticky top-0 table-header-group">
            <tr className="capitalize table-row bg-[#4CAF50] text-white [&_th]:table-cell [&_th]:pl-5 [&_th]:pr-3 [&_th]:py-3">
              <th className="rounded-l-lg">Product</th>
              <th>Category</th>
              <th>Status</th>
              <th>Bid</th>
              <th>Your Bid</th>
              <th className="rounded-r-lg">Action</th>
            </tr>
          </thead>
          
          <tbody className="table-row-group">
            {isLoading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Loading width="sidebar"/>
                </td>
              </tr>
            ) : bids?.length === 0 ? (
              <tr className="table-row bg-[#E8F5E9]">
                <td colSpan="7" className="text-center m-2 w-full p-10 h-[400px]">No Bids Made Yet.</td>
              </tr>
            ) : currentItems?.map((bid) => (
              <tr
                className="table-row bg-[#E8F5E9] [&_td]:table-cell [&_td]:pl-5 [&_td]:pr-3 [&_td]:py-3"
                key={bid?._id}
              >
                <td className="rounded-l-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src={bid?.auction?.image}
                      alt="auction image"
                      className="w-[50px] h-[50px] rounded-full border-2 border-[#4CAF50]"
                    />
                    <span className="pr-10">{bid?.auction?.name}</span>
                  </div>
                </td>
                <td>
                  <span>{bid?.auction?.category?.name}</span>
                </td>
                <td className="capitalize">
                  <span className="px-3 py-1 rounded-full text-sm border bg-white border-[#4CAF50]">
                    {bid?.auction?.status}
                  </span>
                </td>
                <td>
                  <span>₹{bid?.auction?.startingPrice}</span>
                </td>
                <td>
                  <span>₹{bid?.bidAmount}</span>
                </td>
                
                <td className="capitalize rounded-r-lg flex justify-center items-center">
                  <Link
                    className="text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] rounded-lg border-2 border-[#4CAF50] p-2 transition-all"
                    to={`/single-auction-detail/${bid?.auction?._id}`}
                  >
                    <FaEye size={24} className="inline mt-[-2px]" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bids?.length === 0 ? <></> : 
          <Pagination 
            totalPosts={bids?.length} 
            postsPerPage={itemsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            nextPage={nextPage}
            prevPage={prevPage}
          />
        }
      </div>
    </div>
  );
};

export default BidsItem;
