import React from "react";
import { voterUsers } from "../constants/index";
const VotersArea = () => {
  
  const { userName, voterID } = voterUsers.user1;
  
  return (
    <div className="min-w-full min-h-[100vh] font-sans overflow-hidden  bg-gradient-to-b from-zinc-900 to-blue-600 text-[#FFF3C7] p-2 ">
      <section className="mt-2 mx-3 flex justify-between overflow-hidden">
        <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 md:mx-auto md:flex-row md:items-center text-slate-700">
          <div className="relative mx-auto px-4 pt-16 sm:max-w-xl md:max-w-full md:px-8 lg:py-32 xl:px-20">
            <div className="mx-auto max-w-xl lg:max-w-screen-xl">
              <div className="mb-16 lg:mb-0 lg:max-w-lg">
                <div className="mb-6 max-w-xl">
                  <h2 className="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-100 sm:text-5xl sm:leading-snug">
                    An inspiring new future <br />
                    for
                    <span className="inline-block text-cyan-500 ml-3.5">
                      Web 3.0
                    </span>
                  </h2>
                  <p className="text-sm text-gray-100 md:text-lg font-medium">
                    change the future with you digital Finger 👆
                  </p>
                </div>
                <div className="flex items-center">
                  <a
                    href="/userLogin"
                    className="mr-6 inline-flex h-12 items-center justify-center rounded bg-gradient-to-r from-blue-900 to-blue-500 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-cyan-400 focus:ring"
                  >
                    {" "}
                    Get started{" "}
                  </a>
                  <a
                    href="/profile"
                    aria-label=""
                    className="inline-flex items-center font-semibold text-cyan-600 transition-colors duration-200 hover:text-cyan-400"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="my-10 mr-20 space-y-16 mt-[11rem]">
          <div className="relative m-auto h-48 w-80 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl transition-transform sm:h-56 sm:w-96 sm:hover:scale-110">
            <div className="absolute top-4 w-full px-8 sm:top-8">
              <div className="flex justify-between">
                <div className="">
                  <p className="font-light">Voter Vitrual ID</p>
                  <p className="font-medium tracking-widest">{userName}</p>
                </div>
                <img
                  className="h-14 w-14 object-fill rounded-full"
                  src="https://images.unsplash.com/photo-1532798369041-b33eb576ef16?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
              </div>
              <div className="pt-1">
                <p className="font-light">Card Number</p>
                <p className=" font-medium">{voterID}</p>
              </div>
              <div className="pt-4 pr-6 sm:pt-6">
                <div className="flex justify-between">
                  <div className="">
                    <p className="text-xs font-light">Valid From</p>
                    <p className="text-base font-medium tracking-widest">
                      11/15
                    </p>
                  </div>
                  <div className="">
                    <p className="text-xs font-light">Expiry</p>
                    <p className="text-base font-medium tracking-widest">
                      03/25
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VotersArea;
