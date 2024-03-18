import Link from "next/link";


export default function Home() {
  return (
    <main>
      <div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
  <div className="relative">      
    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
      <div className="flex-auto p-6">
      
        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
            <span className="flex  items-center gap-2 text-slate-600 no-underline flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">Welcome</span>
         
        </div>     
        {/* <button type="submit" className='grid  cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none'
          >Login</button> */}
        <div className="flex gap-4 w-full justify-center items-center text-center">
        <Link href={'/userLogin'} className='grid w-20 cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none'>user</Link>
        <Link href={'/admin'} className='grid w-20 cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none'>admin</Link>
        </div>
      </div>
    </div>
    
  </div>
</div>
    </main>
  );
}
