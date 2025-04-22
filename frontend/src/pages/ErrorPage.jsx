import React from "react";
import { Link, useNavigate } from "react-router-dom";
import errorimg from "../assets/error.png";
const ErrorPage = () => {
  return (
    <>
      <div className="flex flex-col items-center px-10 justify-center gap-10 text-[#1B3D1B] text-center h-screen bg-[#E8F5E9]">
        <img className="md:w-[60%] md:max-w-[600px]" src={errorimg} alt="" />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#1B3D1B]">OOps... Page Not Found</h1>
          <p className="text-[#4CAF50]">
            The page you looking for is not found or is removed.
          </p>
        </div>
        <Link
          to="/"
          className="font-Roboto text-lg mx-3 rounded-xl px-4 py-3 cursor-pointer font-bold tracking-wide bg-[#4CAF50] hover:bg-[#2E7D32] text-white transition-all"
        >
          Go To Home
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
