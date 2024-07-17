"use server";
const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const { messageId, authToken } = await req.json();
  const messageToBeDeleted = new mongoose.Types.ObjectId(messageId);
  if (authToken === undefined) {
    return Response.json(
      { Success: false, msg: "Not Authenticated" },
      { status: 400 }
    );
  } else {
    const decodedToken = jwt.decode(authToken);
    const query = { email: decodedToken.email };
    await User.updateOne(query, {
      $pull: { messages: { _id: messageToBeDeleted } },
    });
    const UserFound = await User.findOne(query);

    return Response.json(
      { Success: true, msg: "Deleted Successfully" },
      { status: 200 }
    );
  }
}
