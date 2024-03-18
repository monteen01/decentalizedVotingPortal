"use client"

import { admin } from '../constants/index';
import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const adminLogin = () => {
  
  const [password,setPassword]= useState('')
 const [isValid,setIsValid]= useState(true)
  const route =useRouter() 
  
  const handleSubmit = async (e) => {
    e.preventDefault();             
    const user = Object.values(admin).find(
     user => admin.password === password
    );
     
    
    if (user) {
      setIsValid(true);
      alert('welcome admin')
      route.push('/admin/adminPage')
      
    } else {
      setIsValid(false);
      alert('worng password');
    }
  };
  
      


  return (
   
<div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
  <div className="relative">      
    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
      <div className="flex-auto p-6">
      
        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
            <span className="flex  items-center gap-2 text-slate-600 no-underline flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">Admin</span>
         
        </div>     
            <form id="" className="mb-4"  method="POST">
          <div className="mb-4">
            <label  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"> Password</label>
            <input type="password" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="name" placeholder="Enter your password" value={password} onChange={(e)=>{
              setPassword(e.target.value)
            }} />
          </div>                         
          <button type="submit" className='grid  cursor-pointer select-none rounded-md border border-slate-500 bg-slate-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-slate-600 hover:bg-slate-600 hover:text-white focus:border-slate-600 focus:bg-slate-600 focus:text-white focus:shadow-none'
          onClick={handleSubmit}>Login</button>
          
        {!isValid && <p style={{ color: 'red' }}>Worng Password!</p>}
        <div className='flex gap-1 w-full justify-center items-center text-center my-4'>
        <p> Are you user? </p>
        <Link href={'/userLogin'} className='text-red-600' > user</Link>
        </div>
        </form>

      </div>
    </div>
    
  </div>
</div>

  );
};

export default adminLogin;
