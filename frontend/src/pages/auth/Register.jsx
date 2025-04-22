import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
    // const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "buyer", // Default to buyer
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    
    if (isSuccess) {
      toast.success("Registration successful", {
        autoClose: 1000
      });
      dispatch(reset())

      navigate("/login");
    } else if (isError) {
      toast.error(message, {
        autoClose: 1000
      })
      dispatch(reset())
    }
   
  }, [isSuccess, isError, isLoading]);

  // Submit the form data to the server
  const handleRegister = async (e) => {
    e.preventDefault();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Email format is invalid",{
      autoClose: 1000
    });
    return false;
  } else if (!passwordRegex.test(formData.password)) {
    toast.error(
      "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",{
      autoClose: 1000
      }
    );
    return false;
  } else{
    dispatch(reset())

    dispatch(register(formData))
    
     
      
    }

  
  
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white text-[#1B3D1B]">
      <div className="flex w-[90%] flex-col items-center rounded-xl bg-[#E8F5E9] py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1B3D1B]">
          <span className="uppercase text-[#4CAF50]">B</span>id
          <span className="uppercase text-[#4CAF50]">M</span>y
          <span className="uppercase text-[#4CAF50]">C</span>rops
        </h1>

        <p className="m-2 text-xl">Create your account</p>
        <p className="my-3 h-[1px] w-[80%] bg-[#4CAF50]"></p>
        <form className="flex w-[90%] flex-col sm:w-[90%]" onSubmit={handleRegister}>
          <label className="my-1 text-lg">Full Name</label>
          <input
            type="text"
            placeholder="Your Full Name"
            className="w-full pl-5 py-3 rounded text-[#1B3D1B] bg-white placeholder-[#1B3D1B] outline-none mb-3 border border-[#4CAF50] focus:border-[#2E7D32]"
            name="fullName"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            required
          />
          <label className="my-1 text-lg">Email Address</label>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full pl-5 py-3 rounded text-[#1B3D1B] bg-white placeholder-[#1B3D1B] outline-none mb-3 border border-[#4CAF50] focus:border-[#2E7D32]"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <label className="my-1 mt-2 text-lg">Password</label>
          <div className="pr-3 overflow-hidden flex justify-between items-center w-full rounded bg-white outline-none mb-4 border border-[#4CAF50]">
            <input
              type="password"
              placeholder="Your Password"
              className="w-full pl-5 py-3 bg-white text-[#1B3D1B] placeholder-[#1B3D1B] outline-none"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <label className="my-1 text-lg">Account Type</label>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="buyer"
                checked={formData.userType === "buyer"}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                className="w-4 h-4 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span>Buyer</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="seller"
                checked={formData.userType === "seller"}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
                className="w-4 h-4 text-[#4CAF50] focus:ring-[#4CAF50]"
              />
              <span>Seller</span>
            </label>
          </div>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#4CAF50] px-4 py-3 font-bold hover:bg-[#2E7D32] text-white"
            disabled={isLoading ? true : false}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-[#4CAF50] hover:text-[#2E7D32]"
          >
            Sign In.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
