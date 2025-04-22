import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { reset, changeCurrentPassword } from "../../store/auth/authSlice";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const {isLoading,isSuccess , isError,message}=useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  const handleChangeCurrentPassword = (e) => {
    e.preventDefault();

    if (formData.oldPassword === "" || formData.newPassword === "") {
      toast.error("All fields are required");
      return false;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character",{
          autoClose:700
        }
      );
      return false;
    }

    dispatch(changeCurrentPassword(formData)).then(()=>{
      if(isSuccess){
        toast.success(message,{
          autoClose:500
        })
      }
      if(isError){
        toast.error(message,{
          autoClose:500
        })
      }
    })
  };

  return (
    <div className="flex flex-col w-full px-7 py-4 bg-[#E8F5E9] text-[#1B3D1B] rounded-2xl">
      <h2 className="text-[#1B3D1B] font-bold text-xl border-b border-[#4CAF50] pb-3 mb-5">
        Change Password
      </h2>
      <form
        className="flex flex-col gap-5 lg:w-[50%] inputs:outline-none inputs:px-3 inputs:py-4 inputs:rounded-xl inputs:bg-white inputs:border inputs:border-[#4CAF50] focus:inputs:border-[#2E7D32]"
        onSubmit={handleChangeCurrentPassword}
      >
        <div className="flex flex-col">
          <label className="my-1 text-lg">Old Password</label>
          <input
            type="password"
            placeholder="Enter old Password"
            className="text-[#1B3D1B] placeholder-[#4CAF50] bg-white border border-[#4CAF50] rounded-xl px-3 py-2"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            required
          />
          <label className="my-1 text-lg">New Password</label>
          <input
            type="password"
            placeholder="Enter new Password"
            className="text-[#1B3D1B] placeholder-[#4CAF50] bg-white border border-[#4CAF50] rounded-xl px-3 py-2"
            name="newPassword"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-xl px-4 py-3 text-white cursor-pointer font-bold tracking-wide w-fit bg-[#4CAF50] hover:bg-[#2E7D32] transition-all"
        >
          {isLoading ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
