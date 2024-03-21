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

  const route = useRouter();
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
  const verify = async function (e) {
    e.preventDefault();
    if (genOtp === otp) {
      setIsVerified(true);
      route.push("/votersArea");
    } else {
      setIsVerified(false);
      errorToast("wrong Otp");
    }
  };

  return (
    <div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
      <Toaster />

      <div className="relative">
        <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
          <div className="flex-auto p-6">
            <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
              <span className="flex  items-center gap-2 text-slate-600 no-underline flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">
                Login
              </span>
            </div>
            <form id="" className="mb-4" method="POST">
              <div className="mb-4">
                <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700">
                  {" "}
                  Id
                </label>
                <input
                  type="text"
                  className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow"
                  id="email"
                  name="name"
                  placeholder="Enter your  voterId"
                  value={voterID}
                  onChange={(e) => {
                    setVoterID(e.target.value);
                  }}
                />
              </div>

              <div className="mb-4"></div>
              {counter == 0 ? (
                <button
                  type="submit"
                  className="grid  cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
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
                    className="grid my-3 cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none"
                    onClick={verify}
                  >
                    Enter
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
