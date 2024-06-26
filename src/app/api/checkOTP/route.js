"use server";
const mongoose = require("mongoose");
import { cookies } from "next/headers";
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

export async function POST(req) {
  const { email, otp } = await req.json();
  const query = { email: email };
  const UserFound = await User.findOne(query);

  if (UserFound) {
    if (UserFound.otp === Number(otp)) {
      cookies().set({
        name: "user",
        value: JSON.stringify(UserFound),
        httpOnly: true,
        path: "/",
      });
      return Response.json({
        Success: true,
        user: UserFound,
        message: "OTP Verified",
      });
    } else {
      return Response.json({
        Success: false,
        message: "Incorrect OTP",
      });
    }
  } else {
    return Response.json({ Success: false, message: "No such user" });
  }
}
