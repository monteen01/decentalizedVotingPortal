import Link from "next/link";
import Image from "next/image";
import Layout from "./layout";

export default function Home() {
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/background4.jpg"
            alt="backgroundimg"
            style={{ objectFit: "cover" }}
            fill={true}
            // width={500}
            // height={500}
            quality={100}
          />
        </div>

        {/* Login and Admin Forms */}
        <div className="relative z-10">
          <div
            className="sm:w-[30rem]  backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100
 rounded-lg shadow-lg px-4 py-6"
          >
            <div className="flex items-center justify-center mb-10">
              <h1 className="text-3xl font-black text-slate-100">
                Login To Vote
              </h1>
            </div>

            <div className="flex justify-center items-center">
              <div className="my-20">
                <Link
                  href="/userLogin"
                  className="relative mr-2 mt-4 rounded-lg border-2 border-blue-700 bg-blue-700 hover:bg-blue-800 px-6 py-2 font-medium text-white transition hover:translate-y-1"
                >
                  <div className="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-600 hover:text-blue-800">
                    <Image
                      src="/Arrow.svg"
                      alt="Arrow"
                      width={50}
                      height={50}
                      quality={100}
                    />
                  </div>
                  Login voters
                </Link>
                <Link
                  href="/admin"
                  className="mt-4 rounded-lg   border-2 border-white  hover:border-gray-200 hover:text-gray-200 px-6 py-2 font-medium text-slate-100 transition hover:translate-y-1"
                >
                  admin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
