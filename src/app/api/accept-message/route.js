"use server";
const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const jwt = require("jsonwebtoken");

function generateAuthToken(newuser) {
  try {
    const token = jwt.sign(
      {
        _id: newuser._id,
        name: newuser.username,
        email: newuser.email,
        messages: newuser.messages,
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
  const { isAccepting, AuthToken } = await req.json();

  if (!AuthToken) {
    return Response.json(
      { Success: false, msg: "Not Authenticated" },
      { status: 400 }
    );
  } else {
    const decodedToken = jwt.decode(AuthToken);
    const query = { email: decodedToken.email };
    await User.updateOne(query, {
      $set: { isAcceptingMessages: isAccepting },
    });
    const UserFound = await User.findOne(query);
    const token = generateAuthToken(UserFound);
    return Response.json(
      { Success: true, msg: "Updated", token },
      { status: 200 }
    );
  }
}
