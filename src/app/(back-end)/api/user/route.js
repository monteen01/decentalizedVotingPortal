"use server";
import db from "@/utils/db"
import User from "@/model/user"
import {  sendMail } from "../sendEmail";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req){
  
  await db();
  try {
    const reqBody = await req.json();
    const { name, email, voterID, dateOfBirth, place, bloodGroup, gender } = reqBody;
    await User.create({ name, email, voterID, dateOfBirth, place, bloodGroup, gender });
    return NextResponse.json({ status: 201, body: { message: 'User created successfully' } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, body: { error: 'Internal Server Error' } });
  }

} 
 export const send = async (email,otp) => {
  

    await sendMail({
      to: email,
      name: "Admin",
      subject: "OTP",
      body:`your otp is <h1>${otp} </h1>`,
    });
    
    
  }