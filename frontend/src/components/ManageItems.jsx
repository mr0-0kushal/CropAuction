import { useDispatch, useSelector } from "react-redux";
import { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import {
  deleteSingleAuctionById,
  getSellerAuction,
  reset,
} from "../store/auction/auctionSlice";
import { FaEye } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import Loading from "./Loading"
import Pagination from "./Pagination";
const ManageItems = () => {
  const dispatch = useDispatch();
  const { sellerAuction, isLoading } = useSelector((state) => state.auction);

  // componentDidMount and component
  useEffect(() => {
    dispatch(getSellerAuction());
  }, [dispatch]);
  //console.log(sellerAuction, "sellerAuction....");

  const handleDeleteAuction = async (id) => {
    //console.log(id, "delete id....");
    await dispatch(deleteSingleAuctionById(id)).then(() => {
      toast.success("item deleted.", {
        autoClose: 500,
      });
    });
    dispatch(getSellerAuction());
  };

   //pagination part
   const [currentPage, setCurrentPage] = useState(1)
   const [itemsPerPage, setitemsPerPage] = useState(6)
   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = sellerAuction?.auctions?.slice(indexOfFirstItem, indexOfLastItem);
 
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
        Manage Items
      </h2>
      <div className="overflow-auto px-4 bg-white rounded-2xl border border-[#4CAF50]">
        <table className="text-left whitespace-nowrap w-full border-separate border-spacing-x-0 border-spacing-y-4">
          <thead className="table-header-group">
            <tr className="table-row bg-[#4CAF50] text-white [&_th]:table-cell [&_th]:pl-5 [&_th]:pr-3 [&_th]:py-3">
              <th className="rounded-l-lg">Product</th>
              <th>Category</th>
              <th>Bids</th>
              <th>Status</th>
              <th>Your Bid</th>
              <th>Winner</th>
              <th className="rounded-r-lg">Action</th>
            </tr>
          </thead>
          
          <tbody className="table-row-group">
            {sellerAuction?.auctions?.length === 0 ? (
              <tr className="table-row bg-[#E8F5E9]">
                <td colSpan="7" className="text-center m-2 w-full p-10 h-[400px]">No Items</td>
              </tr>
            ) : (
              isLoading ? <tr>
                <td colSpan="7" className="text-center">
                  <Loading width="sidebar"/>
                </td>
              </tr> : currentItems?.map((auction) => (
                <tr
                  key={auction?._id}
                  className="table-row bg-[#E8F5E9] [&_td]:table-cell [&_td]:pl-5 [&_td]:pr-3 [&_td]:py-3"
                >
                  <td className="rounded-l-lg">
                    <div className="flex items-center gap-2">
                      <img
                        src={auction?.image}
                        alt="auction image"
                        className="w-[50px] h-[50px] rounded-full border-2 border-[#4CAF50]"
                      />
                      <span className="pr-10">{auction?.name}</span>
                    </div>
                  </td>
                  <td>
                    <span>{auction?.category?.name || "---"}</span>
                  </td>
                  <td>
                    <span>{auction?.bids?.length}</span>
                  </td>
                  <td className="capitalize">
                    <span className="px-3 py-1 rounded-full text-sm border bg-white border-[#4CAF50]">
                      {auction?.status}
                    </span>
                  </td>
                  <td>
                    <span>${auction?.startingPrice}</span>
                  </td>
                  <td>
                    <span>{auction?.winner?.bidder?.fullName || "----"}</span>
                  </td>
                  <td className="link:mr-2 capitalize rounded-r-lg">
                    <Link
                      className="text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] rounded-lg border-2 border-[#4CAF50] px-2 py-[5px] transition-all mr-2"
                      to={`/single-auction-detail/${auction?._id}`}
                    >
                      <FaEye size={16} className="inline mt-[-2px]" />
                    </Link>
                    {auction?.status === "upcoming" && (
                      <>
                        <Link
                          className="text-[#4CAF50] hover:text-white hover:bg-[#4CAF50] rounded-lg border-2 border-[#4CAF50] px-2 py-[5px] transition-all mr-2"
                          to={`/edit-auction/${auction?._id}`}
                        >
                          <FaRegEdit size={16} className="inline mt-[-3px]" />
                        </Link>
                      </>
                    )}

                    <button
                      className="text-red-500 hover:text-white hover:bg-red-500 rounded-lg border-2 border-red-500 px-[6px] py-[3px] transition-all"
                      onClick={() => handleDeleteAuction(auction?._id)}
                    >
                      <MdDeleteForever
                        size={20}
                        className="inline mt-[-3px]"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {sellerAuction?.auctions?.length === 0 ? <></> : 
        <Pagination 
          totalPosts={sellerAuction?.auctions?.length} 
          postsPerPage={itemsPerPage} 
          paginate={paginate}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      }
    </div>
  );
};

export default ManageItems;
