"use server";
import {  sendMail } from "../sendEmail";




 export const send = async (email,otp) => {
  

    await sendMail({
      to: email,
      name: "Admin",
      subject: "OTP",
      body:`your otp is <h1>${otp} </h1>`,
    });
    
    
  }