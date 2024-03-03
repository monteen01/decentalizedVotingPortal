"use server";
import { sendMail } from "./sendEmail";
import otpGenerator from "otp-generator";

export const send = async (email) => {
  const generatedOtp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
  });

  
  await sendMail({
    to: email,
    name: "Admin",
    subject: "OTP",
    body: `your otp is <h1>${generatedOtp} </h1>`,
  });
};
