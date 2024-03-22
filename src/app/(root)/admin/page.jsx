"use client";

import { admin } from "../constants/index";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

const adminLogin = () => {
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const route = useRouter();
  const successToast = (message) => {
    toast.success(message, {
      position: "top-center", // Adjust position as desired
      autoClose: 5000, // Close after 5 seconds
    });
  };
  const errorToast = (message) => {
    toast.error(message, {
      position: "top-center", // Adjust position as desired
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = Object.values(admin).find(
      (user) => admin.password === password
    );

    if (user) {
      setIsValid(true);
      successToast("welcome admin");
      route.push("/admin/adminPage");
    } else {
      setIsValid(false);
      errorToast("worng password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 bg-gradient-to-r from-[#1488CC] to-[#2B32B2]">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <Toaster />
        <h1 className="text-3xl font-bold text-center  text-gray-800 mb-6">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <label
              htmlFor="password"
              className="block text-xs font-medium uppercase text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full my-1 py-2 px-3 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>
          {!isValid && (
            <p className="text-red-500 text-sm mt-2">Wrong Password!</p>
          )}
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-600">Are you a user?</p>
          <Link href="/userLogin" className="text-sm text-red-600 ml-1">
            Go to User Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default adminLogin;
