"use server";
const bcrypt = require("bcrypt");

import { cookies } from "next/headers";
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

const saltRounds = 10;

export async function POST(req, res) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return Response.json({ Success: false, msg: "Missing fields" });
  }
  const findQuery = { email: email };
  const emailFind = await User.findOne(findQuery);

  if (emailFind) {
    var checkEncryptedPassword = await bcrypt.compare(
      password,
      emailFind.password
    );

    if (checkEncryptedPassword == true) {
      cookies().set({
        name: "user",
        value: JSON.stringify(emailFind),
        httpOnly: true,
        path: "/",
      });
      return Response.json({
        Success: true,
        user: emailFind,
        msg: "Successfully Logged In",
      });
    } else {
      return Response.json({ Success: false, msg: "Wrong Password" });
    }
  } else {
    return Response.json({ Success: false, msg: "Please Register First" });
  }
}
