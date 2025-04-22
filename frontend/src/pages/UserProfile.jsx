import { Link, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChangePassword from "./auth/ChangePassword";
import ProfileComponent from "../components/ProfileComponent";
import ManageItems from "../components/ManageItems";
import BidsItem from "../components/BidsItem";
import Notifications from "../components/Notifications";
import AccountSetting from "../components/AccountSetting";
import { SellerRoutes } from "../auth/Protected";
import PaymentMethod from "../components/PaymentMethod";
import Cart from "../components/Cart";
import ErrorPage from "./ErrorPage";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const UserProfile = () => {
  return (
    <motion.div
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="text-white flex items-center justify-center flex-col h-[280px] bg-hero-img bg-center-center bg-cover-full bg-no-repeat relative before:content-[''] before:absolute before:inset-0 before:bg-[#1B3D1B] before:bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-center font-bold text-3xl relative z-10">Profile</h1>
        <div className="flex gap-2 font-medium pt-2 relative z-10">
          <Link
            to="/"
            className="no-underline hover:text-[#4CAF50] transition-all"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[#4CAF50]">Profile</span>
        </div>
      </motion.div>

      <motion.div
        className="flex gap-4 px-5 py-10 flex-wrap lg:flex-nowrap"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Sidebar />
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Routes>
            <Route path="/profile" element={<ProfileComponent />} />
            <Route element={<SellerRoutes />}>
              <Route path="/manage-items" element={<ManageItems />} />
            </Route>
            <Route path="/bids-items" element={<BidsItem />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/account-settings" element={<AccountSetting />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/payment-method" element={<PaymentMethod />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/logout" element={<ChangePassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfile;
