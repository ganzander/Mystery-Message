const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
import { cookies } from "next/headers";

export async function POST(req) {
  const { isAcceptingMsg } = await req.json();

  const userCookie = cookies().get("user");

  if (!userCookie?.value) {
    return Response.json({ msg: "Not Authenticated" }, { status: 400 });
  } else {
    const userCookieValue = userCookie.value;
    const user = JSON.parse(userCookieValue);
    const query = { email: user.email };
    await User.updateOne(query, {
      $set: { isAcceptingMessages: isAcceptingMsg },
    });
    const UserFound = await User.findOne(query);

    cookies().set({
      name: "user",
      value: JSON.stringify(UserFound),
      httpOnly: true,
      path: "/",
    });
    return Response.json({ msg: "Updated", UserFound }, { status: 200 });
  }
}

export async function GET(req) {
  const userCookie = cookies().get("user");
  if (!userCookie?.value) {
    return Response.json({ msg: "Not Authenticated" }, { status: 400 });
  } else {
    const userCookieValue = userCookie.value;
    const user = JSON.parse(userCookieValue);
    console.log(userCookieValue);
    const { isAcceptingMessages } = user;
    return Response.json({ msg: isAcceptingMessages }, { status: 200 });
  }
}
