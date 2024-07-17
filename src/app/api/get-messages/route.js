const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const { authToken } = await req.json();
  if (authToken === undefined) {
    return Response.json({ msg: "Not Authenticated" }, { status: 400 });
  } else {
    const decodedToken = jwt.decode(authToken);
    const query = { email: decodedToken.email };
    const UserFound = await User.findOne(query);
    const userMessages = UserFound.messages;
    return Response.json(
      { msg: "Successfully got messages", userMessages: userMessages },
      { status: 200 }
    );
  }
}
