import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/auth/authSlice";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
    //console.log("useEffect........");
  }, []);
  useEffect(() => {}, [user]);
  //console.log(user, "user............");

  return (
    <>
      <div className="flex flex-col gap-4 w-full">        
        <div className="flex min-h-[400px] flex-wrap gap-4 lg:flex-nowrap">
          <div className="w-full lg:w-[35%] bg-[#E8F5E9] rounded-2xl p-5">
            <div className="flex flex-col items-center gap-4">
              <img
                src={user?.profilePicture}
                alt="profile"
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-[#4CAF50]"
              />
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1B3D1B]">{user?.fullName}</h2>
                <p className="text-[#4CAF50] capitalize">{user?.userType}</p>
              </div>
              <Link
                to="/user-profile/account-settings"
                className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#2E7D32] text-white px-4 py-2 rounded-xl transition-all"
              >
                <FaRegEdit />
                Edit Profile
              </Link>
            </div>
            <div className="mt-8">
              <h3 className="text-[#1B3D1B] font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2 text-[#1B3D1B]">
                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-medium">Phone:</span> {user?.phone || "Not provided"}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {user?.location?.name || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-[#E8F5E9] rounded-2xl p-5">
            <h2 className="text-2xl font-bold text-[#1B3D1B] mb-6">Activity Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-[#4CAF50]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#E8F5E9] rounded-full">
                    <FaUserPlus className="text-[#4CAF50] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-[#1B3D1B] font-semibold">Member Since</h3>
                    <p className="text-[#4CAF50]">
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#4CAF50]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#E8F5E9] rounded-full">
                    <BsCurrencyExchange className="text-[#4CAF50] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-[#1B3D1B] font-semibold">Total Bids</h3>
                    <p className="text-[#4CAF50]">{user?.bids?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#4CAF50]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#E8F5E9] rounded-full">
                    <AiFillLike className="text-[#4CAF50] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-[#1B3D1B] font-semibold">Auctions Won</h3>
                    <p className="text-[#4CAF50]">{user?.wonAuctions?.length || 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-[#4CAF50]">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#E8F5E9] rounded-full">
                    <FaRegEdit className="text-[#4CAF50] text-xl" />
                  </div>
                  <div>
                    <h3 className="text-[#1B3D1B] font-semibold">Account Status</h3>
                    <p className="text-[#4CAF50] capitalize">{user?.status || "Active"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
