import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../store/auth/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBars, FaTimes, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import NavSidebar from "./NavSidebar";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  const closeNavbar = () => {
    setNavbarOpen(false);
  };

  const logoutHandle = () => {
    dispatch(logout());
    toast.success("Logout Successfully!");
    setSidebarOpen(false);
    dispatch(reset());
    navigate("/login/admin");
  };

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 bg-[#1B3D1B] py-4 border-b border-[#4CAF50] shadow-md">
      <div className="flex items-center z-[1]">
        <Link to="/admin/dashboard" className="no-underline">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-Roboto">
            <span className="uppercase text-[#4CAF50]">B</span>id
            <span className="uppercase text-[#4CAF50]">M</span>y
            <span className="uppercase text-[#4CAF50]">C</span>rops
            <span className="text-[#4CAF50] ml-2">Admin</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center cursor-pointer z-[1]">
        {user ? (
          <div className="flex justify-center items-center gap-4">
            <div className="relative group">
              <img
                src={user?.profilePicture}
                key={user.profilePicture}
                alt="user image"
                className="w-10 h-10 rounded-full cursor-pointer ring-2 ring-[#4CAF50] hover:ring-[#2E7D32] transition-all duration-300"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              />
              
              {sidebarOpen && (
                <div className="absolute right-0 top-12 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E8F5E9] overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-2 text-sm text-[#1B3D1B] border-b border-[#E8F5E9]">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-[#757575]">{user.email}</p>
                    </div>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1B3D1B] hover:bg-[#E8F5E9] transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaUser className="text-[#4CAF50]" />
                      Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-[#1B3D1B] hover:bg-[#E8F5E9] transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <FaCog className="text-[#4CAF50]" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logoutHandle();
                        setSidebarOpen(false);
                      }}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-[#D32F2F] hover:bg-[#FFEBEE] transition-colors"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white sm:hidden p-2 hover:bg-[#2E7D32] rounded-lg transition-colors"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="bg-[#4CAF50] hover:bg-[#2E7D32] no-underline font-Roboto text-base text-white py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Sign In
            </Link>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="text-white sm:hidden p-2 hover:bg-[#2E7D32] rounded-lg transition-colors"
            >
              {navbarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        )}
      </div>

      {navbarOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div className="absolute inset-0 bg-[#1B3D1B]/80 backdrop-blur-sm" onClick={closeNavbar} />
          <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl">
            <NavSidebar closeNavbar={closeNavbar} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
