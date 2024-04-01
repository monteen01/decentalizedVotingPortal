"use client"
import React, { useState } from 'react';

const CreateUser = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    voterID: '',
    dateOfBirth: '',
    place: '',
    bloodroup: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        
        alert('User created successfully');
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center text-center">
        <div className="w-24 h-[50%]">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder='enter name'/>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder='enter email'/>
            <input type="date" name="dateOfBirth" value={user.dateOfBirth} onChange={handleChange} placeholder='enter dateOfBirth'/>
            <input type="text" name="place" value={user.place} onChange={handleChange} placeholder='enter place'/>
            <input type="text" name="bloodroup" value={user.bloodroup} onChange={handleChange} placeholder='enter bloodroup'/>
            <input type="text" name="gender" value={user.gender} onChange={handleChange} placeholder='enter gender'/>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
