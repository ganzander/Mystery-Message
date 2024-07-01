"use server";
const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

export async function POST(req) {
  const { name } = await req.json();
  if (!name) {
    return Response.json({ Success: false, message: "Enter username" });
  }

  const UserFound = await User.findOne({ username: name });

  if (UserFound) {
    return Response.json({
      Success: false,
      message: "Username Already Taken",
    });
  } else {
    return Response.json({ Success: true, message: "Username Available" });
  }
}
