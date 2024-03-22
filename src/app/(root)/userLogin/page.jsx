"use client";
import Link from "next/link";
import { voterUsers } from "../constants/index";
import { send } from "../../(back-end)/api/user/route";
import { useState, useEffect } from "react";
import crypto from "crypto";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [voterID, setVoterID] = useState("");
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState("0");
  const [genOtp, setGenOtp] = useState("");

  const router = useRouter();
  function genrateOtp() {
    const Gen = crypto.randomBytes(6).toString("hex").toUpperCase().slice(0, 6);
    setGenOtp(Gen);
    return Gen;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const successToast = (message) => {
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
      });
    };
    const errorToast = (message) => {
      toast.error(message, {
        position: "top-center",
      });
    };
    const Gen = genrateOtp();
    // alert(Gen)

    const user = Object.values(voterUsers).find((user) => user.voterID);
    var email = user.email;

    //  console.log(email)
    if (user.voterID === voterID) {
      setIsValid(true);
      setEmail(email);
      const Gen = genrateOtp();
      successToast("Generated OTP: " + Gen);
      // alert(Gen);
      send(email, Gen);
      setCounter(1);
    } else {
      setIsValid(false);
      errorToast("invalid ID");
    }
  };
  const verify = async (e) => {
    e.preventDefault();
    if (genOtp === otp) {
      setIsVerified(true);
      router.push("/votersArea");
    } else {
      setIsVerified(false);
      toast.error("Wrong OTP", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50 bg-gradient-to-r from-[#1488CC] to-[#2B32B2]">
      <Toaster />

      <div className="relative ">
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-5 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <span className="text-3xl font-bold text-center text-gray-800 mb-6">
                Login
              </span>
            </div>
            <form id="" className="mb-4" method="POST">
              <div>
                <label
                  htmlFor="voterID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Voter ID
                </label>
                <input
                  type="text"
                  id="voterID"
                  className="my-3 py-2 px-1 border-b-2 focus:border-b-0 outline-none block w-full rounded-md border-blue-500 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter your voter ID"
                  value={voterID}
                  onChange={(e) => setVoterID(e.target.value)}
                />
                {!isValid && <p className="mt-1 text-red-500">Invalid ID</p>}
              </div>

              {counter == 0 ? (
                <button
                  type="submit"
                  className="grid w-full shadow-md   cursor-pointer select-none rounded-md border border-blue-500 bg-blue-500 py-2 px-5 text-center align-middle text-sm text-white  hover:border-blue-600 hover:bg-blue-600  outline-blue-500 hover:text-white focus:border-blue-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
                  onClick={handleSubmit}
                >
                  Generate OTP
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow "
                    placeholder="Enter otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    className="grid w-full font-medium capitalize my-3 cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
                    onClick={verify}
                  >
                    Vote Now 👆
                  </button>
                </>
              )}
              {!isValid && <p style={{ color: "red" }}>User!</p>}
              {!isVerified && <p style={{ color: "red" }}>Wrong Otp</p>}
              <div className="flex gap-1 w-full justify-center items-center text-center my-4">
                <p> Are you admin?</p>
                <Link href={"/admin"} className="text-red-600">
                  admin
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
