import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
        <div className="relative">
          <Image
            src="./background.svg"
            alt="backgroundimg"
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div>
          <div className="relative flex flex-col sm:w-[30rem] rounded-lg  px-4">
            <div className="flex-auto p-6">
              <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
                <span className="flex items-center gap-2 py-2 text-slate-600 no-underline flex-shrink-0 text-3xl font-black capitalize tracking-tight opacity-100 ">
                  Login To Vote
                </span>
              </div>

              <div className="flex justify-center items-center">
                <div className="my-20">
                  <Link
                    href={"/userLogin"}
                    className="relative mr-2 mt-4 rounded-lg border-2 border-blue-700 bg-blue-700 hover:bg-blue-800 px-6 py-2 font-medium text-white transition hover:translate-y-1"
                  >
                    <div className="-scale-x-100 absolute left-0 -bottom-10 inline-flex h-10 w-10 -rotate-12 text-blue-600 hover:text-blue-800">
                      <Image
                        src="./Arrow.svg"
                        alt="Arrow"
                        width={50}
                        height={50}
                        priority
                      />
                    </div>
                    Login voters
                  </Link>
                  <Link
                    href={"/admin"}
                    className="mt-4 rounded-lg border-2 border-blue-700 px-6 py-2 font-medium text-blue-700 transition hover:translate-y-1"
                  >
                    admin
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
