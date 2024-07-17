"use server";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

function generateAuthToken(newuser) {
  try {
    const token = jwt.sign(
      {
        _id: newuser._id,
        name: newuser.username,
        email: newuser.email,
        isAcceptingMessages: newuser.isAcceptingMessages,
      },
      process.env.HASH_KEY
    );
    return token;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(req) {
  const { email, otp } = await req.json();
  const query = { email: email };
  const UserFound = await User.findOne(query);

  if (UserFound) {
    if (UserFound.otp === Number(otp)) {
      const authToken = generateAuthToken(UserFound);
      return Response.json({
        Success: true,
        AuthToken: authToken,
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
