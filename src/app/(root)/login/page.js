"use client"

import { voterUsers } from '../constants/index';
import {send} from '../../(back-end)/api/route'
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = Object.values(voterUsers).find(
      user => user.userName === username && user.email === email
    );
    if (user) {
      setIsValid(true);
       send(email)
      alert('OTP generated');
    } else {
      setIsValid(false);
      alert('Invalid username or email!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}  className='bg-slate-300 w-64 h-98 absolute mx-[50%] my-[10%] left-0 rounded-md p-4' >
      <h1 className='mx-[40%] py-4 '>Login</h1>
        
        <input
          type="text"
          className='border-4 border-slate-400 rounded-lg mx-4 '
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          className='border-4 border-slate-400 rounded-lg my-2 mx-4 '

          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className='border-4 border-slate-400 rounded-lg bg-slate-800 text-white mx-14 p-1 '>Generate OTP</button>
        {!isValid && <p style={{ color: 'red' }}>Invalid username or email!</p>}
      </form>
    </div>
  );
};

export default Login;
