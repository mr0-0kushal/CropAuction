import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { getNotificationForUser } from "../store/notification/notificationSlice";
import socket from "../socket";
import { FaBars, FaTimes, FaUser, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);
  let navigate = useNavigate();
  let location = useLocation();
  const logInUser = JSON.parse(localStorage.getItem("user"));

  //console.log(notifications, "notifications............ header......");
  //i want a length of isRead ===false
  const unReadNotifications = notifications.filter(
    (notification) => notification.isRead === false
  );
  //console.log(unReadNotifications.length, "unreadnotificatons........ length");

  useEffect(() => {}, [user]);
  useEffect(() => {
    if (logInUser) {
      dispatch(getNotificationForUser());
    }
    socket.on("newBidNotification", (data) => {
      
      socket.emit("joinAuction", logInUser?._id);

      dispatch(getNotificationForUser());
    });

    //console.log(notifications, "notification dispatch............");
  }, [location]);

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center px-2  sm:px-14 bg-[#1c882b] py-4 border-b border-border-info-color">
      <div className="flex items-center px-1 z-[1]">
        <Link to="/dashboard" className=" no-underline ">
          <h1 className="text-3xl font-bold text-[#ffffff] font-Roboto">
            <span className="uppercase text-[#3B82F6]">B</span>id
            <span className="uppercase text-[#3B82F6]">M</span>y
            <span className="uppercase text-[#3B82F6]">C</span>rops
          </h1>
        </Link>
      </div>
      <div className="hidden sm:block">
        <Link
          to="/"
          className="text-[#ffffff] font-Roboto text-lg mx-3 hover:text-[#3B82F6] transition-all "
        >
          Home
        </Link>

        <Link
          to="/contact-us"
          className="text-[#ffffff] font-Roboto text-lg mx-3 hover:text-[#3B82F6] transition-all"
        >
          Contact
        </Link>
        <Link
          to="/about-us"
          className="text-[#ffffff] font-Roboto text-lg mx-3 hover:text-[#3B82F6] transition-all"
        >
          About
        </Link>
      </div>
      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center">
            <Link
              to="/user-profile/cart"
              className="text-[#3B82F6] font-Roboto text-lg mx-3"
            >
              <BsCart3 className="text-[#3B82F6]  hover:text-[#3B82F6]  transition-all " />
            </Link>
            <img
              src={user?.profilePicture}
              key={user.profilePicture}
              alt="user image"
              className="w-10 h-10 rounded-full order-2 cursor-pointer active:scale-[0.95] transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
            <Link to="/user-profile/notifications" className="mr-2 relative">
              {unReadNotifications.length > 0 ? (
                <span className="absolute right-0 top-0 w-[18px] h-[18px] flex items-center justify-center bg-[#3B82F6] rounded-full  text-white text-xs font-bold ">
                  {unReadNotifications.length}
                </span>
              ) : null}

              <IoIosNotificationsOutline
                size={37}
                className="text-[#3B82F6] text-xl cursor-pointer bg-[#4CAF50] hover:text-[#3B82F6] rounded-full p-2 transition-all "
              />
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-[#3B82F6] font-Roboto sm:hidden text-lg mx-3 order-3"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-[#3B82F6] no-underline font-Roboto text-base  hover:bg-[#3B82F6] transition-all duration-150 text-white py-1 sm:py-2 sm:px-3 px-2 rounded-md text-md font-semibold"
            >
              Sign In
            </Link>
            <Link
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-[#3B82F6] font-Roboto sm:hidden text-lg mx-3 order-3 z-50"
            >
              {navbarOpen ? <FaTimes size={25} /> : <FaBars size={25} />}
            </Link>
          </>
        )}
      </div>

      {user && sidebarOpen ? (
        <div
          className={`${
            sidebarOpen ? "animate-fadein" : "hidden"
          } rounded-xl origin-top-right overflow-hidden absolute right-12 top-16 mt-[4px] bg-[#1B3D1B] border-2 border-[#4CAF50] z-50 w-[250px] shadow-lg`}
        >
          <nav className="py-2 [&_a]:transition-all [&_a]:duration-100">
            <Link
              to="/user-profile/profile"
              className="flex items-center gap-3 no-underline text-white font-Roboto text-lg py-3 px-7 hover:bg-[#2E7D32] hover:text-[#4CAF50]"
              onClick={() => setSidebarOpen(false)}
            >
              <FaUser className="text-[#4CAF50]" />
              Profile
            </Link>
            <Link
              to={
                user.userType === "seller"
                  ? "/user-profile/manage-items"
                  : "/user-profile/bids-items"
              }
              className="flex items-center gap-3 no-underline text-white font-Roboto text-lg py-3 px-7 hover:bg-[#2E7D32] hover:text-[#4CAF50]"
              onClick={() => setSidebarOpen(false)}
            >
              <FaBox className="text-[#4CAF50]" />
              {user.userType === "seller" ? "Manage Items" : "Bids Items"}
            </Link>
            <Link
              to="/user-profile/account-settings"
              className="flex items-center gap-3 no-underline text-white font-Roboto text-lg py-3 px-7 hover:bg-[#2E7D32] hover:text-[#4CAF50]"
              onClick={() => setSidebarOpen(false)}
            >
              <FaCog className="text-[#4CAF50]" />
              Account Setting
            </Link>
            <Link
              onClick={() => {
                logoutHandle();
                setSidebarOpen(false);
              }}
              className="flex items-center gap-3 no-underline text-white font-Roboto text-lg py-3 px-7 hover:bg-[#2E7D32] hover:text-[#4CAF50]"
            >
              <FaSignOutAlt className="text-[#4CAF50]" />
              Logout
            </Link>
          </nav>
        </div>
      ) : null}
      {navbarOpen && (
        <ul className=" flex sm:hidden flex-col justify-center items-center absolute top-16 left-0 w-full h-screen bg-gradient-to-b from-[#4CAF50] to-[#2E7D32] text-[#3B82F6] z-10 [&_li]:flex [&_li]:w-full link:w-full link:px-4 link:py-6 hover:link:bg-[#2E7D32] text-center ">
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/" onClick={() => setNavbarOpen(!navbarOpen)}>
              Home
            </Link>
          </li>

          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/contact-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              Contact
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            <Link to="/about-us" onClick={() => setNavbarOpen(!navbarOpen)}>
              About
            </Link>
          </li>
          <li className="cursor-pointer capitalize text-4xl">
            {user && <Link to="/user-profile/cart" onClick={() => setNavbarOpen(!navbarOpen)}
            >Cart</Link>}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
