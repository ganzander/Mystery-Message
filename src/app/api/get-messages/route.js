const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
import { cookies } from "next/headers";

export async function GET(req) {
  const userCookie = cookies().get("user");

  if (!userCookie?.value) {
    return Response.json(
      { Success: false, msg: "Not Authenticated" },
      { status: 401 }
    );
  } else {
    const userCookieValue = userCookie.value;
    const user = JSON.parse(userCookieValue);
    const query = { email: user.email };
    const UserFound = await User.findOne(query);
    const userMessages = UserFound.messages;
    return Response.json(
      { msg: "Successfully got messages", userMessages: userMessages },
      { status: 200 }
    );
  }
}
