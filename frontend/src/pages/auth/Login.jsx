import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, reset } from "../../store/auth/authSlice";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  // const [showPassword, setShowPassword] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };
  useEffect(() => {
    if (isError) {
      toast.error(message,{
        autoClose: 1000
      });
      dispatch(reset());
    }
    if (isSuccess) {
      toast.success(message,{
        autoClose: 1000
      });
      dispatch(reset());
      navigate("/dashboard");
    }
    return () => {
      dispatch(reset());
    };
  }, [isSuccess, isError, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    dispatch(reset());
    dispatch(login(formData));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white text-[#1B3D1B]">
      <div className="flex w-[90%]  flex-col items-center rounded-xl bg-[#E8F5E9] py-8 sm:w-2/5 sm:px-6">
        <h1 className="text-3xl font-bold text-[#1B3D1B]">
          <span className="uppercase text-[#4CAF50]">B</span>id
          <span className="uppercase text-[#4CAF50]">M</span>y
          <span className="uppercase text-[#4CAF50]">C</span>rops
        </h1>

        <p className="m-2 text-xl">Login with your account</p>
        <p className="my-3 h-[1px] w-[80%] bg-[#4CAF50]"></p>
        <form
          className="flex w-[90%] flex-col sm:w-[90%]"
          onSubmit={handleSubmit}
        >
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
            />
          </div>
          <Link
            to="/forgot-password"
            className="my-1 text-[#4CAF50] no-underline hover:text-[#2E7D32]"
          >
            Forget Password?
          </Link>
          <button
            type="submit"
            className="my-4 font-Roboto outline-none border-none w-full rounded bg-[#4CAF50] px-4 py-3 font-bold hover:bg-[#2E7D32] text-white"
          >
            Sign In
          </button>
        </form>

        <p>
          Dont have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-[#4CAF50] hover:text-[#2E7D32]"
          >
            Sign Up.
          </Link>
        </p>
        <p>
          Are you administrator?{" "}
          <Link
            to="/login/admin"
            className="font-bold text-[#4CAF50] hover:text-[#2E7D32]"
          >
            Sign in.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
