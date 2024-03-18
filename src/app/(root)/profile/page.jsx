import React from 'react'
import { voterUsers } from '../constants/index';

const profilePage = () => {

  const user = Object.values(voterUsers).find(
    user=> user
    );
    const {userName,
    email,
    voterID,
    dateOfBirth,
    place,
    bloodroup,
    gender}=user
    console.log(user)
  return (
    <>
     <h1>{email}</h1>
    </>
  )
}

export default profilePage