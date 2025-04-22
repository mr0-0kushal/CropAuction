import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset, logout } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUser, FaCirclePlus } from "react-icons/fa6";
import { IoIosNotifications, IoMdSettings, IoIosListBox } from "react-icons/io";
import { FaEdit, FaListAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOutSharp, IoWalletOutline } from "react-icons/io5";
import { BiSolidCategory } from "react-icons/bi";
import { RiAuctionFill } from "react-icons/ri";
const Sidebar = ({ closeNavbar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user, "user in sidebar..........,,,,,,.. usertype..");

  useEffect(() => {}, [user]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="w-full hidden sm:block lg:sticky top-5 lg:h-screen lg:w-[25%] sm:min-w-[250px] lg:max-w-[280px]">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-[#E8F5E9]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] p-6">
          <h2 className="text-white text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-[#E8F5E9] text-sm mt-1">Manage your platform</p>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <ul className="flex flex-col gap-2 font-medium">
            <li>
              <Link
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeLink === "/admin/users"
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : "text-[#1B3D1B] hover:bg-[#F5F5F5]"
                }`}
                to="/admin/users"
                onClick={() => handleLinkClick("/admin/users")}
              >
                <FaUser
                  size={18}
                  className={`transition-all duration-300 ${
                    activeLink === "/admin/users" ? "text-[#4CAF50]" : "text-[#757575]"
                  }`}
                />
                <span>Users</span>
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeLink === "/admin/auctions"
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : "text-[#1B3D1B] hover:bg-[#F5F5F5]"
                }`}
                to="/admin/auctions"
                onClick={() => handleLinkClick("/admin/auctions")}
              >
                <RiAuctionFill
                  size={18}
                  className={`transition-all duration-300 ${
                    activeLink === "/admin/auctions" ? "text-[#4CAF50]" : "text-[#757575]"
                  }`}
                />
                <span>Auctions</span>
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center gap-3 py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  activeLink === "/admin/categories"
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : "text-[#1B3D1B] hover:bg-[#F5F5F5]"
                }`}
                to="/admin/categories"
                onClick={() => handleLinkClick("/admin/categories")}
              >
                <BiSolidCategory
                  size={18}
                  className={`transition-all duration-300 ${
                    activeLink === "/admin/categories" ? "text-[#4CAF50]" : "text-[#757575]"
                  }`}
                />
                <span>Categories</span>
              </Link>
            </li>

            {/* Logout Button */}
            <li className="mt-4">
              <button
                onClick={logoutHandle}
                className="flex items-center gap-3 w-full py-2.5 px-4 rounded-xl cursor-pointer transition-all duration-300 text-[#D32F2F] hover:bg-[#FFEBEE]"
              >
                <IoLogOutSharp size={18} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
