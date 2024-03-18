import { voterUsers } from '../constants/index';
import {send} from '../../(back-end)/api/user/route'
import { useState,useEffect } from 'react';
import crypto from 'crypto'
import { useRouter } from 'next/navigation';

const [voterId, setVoterId] = useState('');
  const [email, setEmail] = useState('');  
  const [isValid, setIsValid] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [otp,setOtp]=useState("")
  const [counter,setCounter]=useState('0')
  const [genOtp,setGenOtp] = useState('')

  const page=()=>{


<div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
  <div className="relative">
    


    
    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
      <div className="flex-auto p-6">
      
        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
          <a href="#" className="flex cursor-pointer items-center gap-2 text-red-600 no-underline hover:text-red-500">
            <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">Login</span>
          </a>
        </div>
       
    

        <form id="" className="mb-4"  method="POST">
          <div className="mb-4">
            <label  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"> VoterId</label>
            <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="name" placeholder="Enter your  username" value={voterId} onChange={(e)=>{
              setVoterId(e.target.value)
            }} />
          </div>
          <div className="mb-4">
            <label  className="mb-2 inline-block text-xs font-medium uppercase text-gray-700"> Email</label>
            <input type="text" className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow" id="email" name="email" placeholder="Enter your email " value={user.email} onChange={(e)=>{
              setUser({...user,email:e.target.value})
            }} />
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <label className="mb-2 inline-block text-xs font-medium uppercase text-gray-700" >Password</label>
              
            </div>
            <div className="relative flex w-full flex-wrap items-stretch">
              <input type="password" id="password" className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-red-500 focus:bg-white focus:text-gray-600 focus:shadow" name="password" placeholder="············" value={user.password} onChange={(e)=>{
              setUser({...user,password:e.target.value})
            }}/>
            </div>
          </div>
          <div className="mb-4">
            
          </div>
          <div className="mb-4">
            <button className="grid  cursor-pointer select-none rounded-md border border-red-500 bg-red-500 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-red-600 hover:bg-red-600 hover:text-white focus:border-red-600 focus:bg-red-600 focus:text-white focus:shadow-none" type="submit" onClick={onSignUp}>Create</button>
          </div>
        </form>

        <p className="mb-4 text-center">
          Already on Kinterest?
          <Link className="cursor-pointer text-red-500 no-underline hover:text-red-500" href={'/login'}> Login</Link>
        </p>
      </div>
    </div>
    
  </div>
</div>



        }