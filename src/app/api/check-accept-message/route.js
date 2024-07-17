"use server";
const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const jwt = require("jsonwebtoken");

export async function POST(req) {
  const { authToken } = await req.json();

  if (authToken === undefined) {
    return Response.json(
      { Success: false, msg: "Not Authenticated" },
      { status: 400 }
    );
  } else {
    const decodedToken = jwt.decode(authToken);
    const { isAcceptingMessages } = decodedToken;
    return Response.json(
      { Success: true, msg: isAcceptingMessages },
      { status: 200 }
    );
  }
}
