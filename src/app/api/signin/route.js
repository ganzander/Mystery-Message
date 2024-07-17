"use server";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const saltRounds = 10;

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
      const authToken = generateAuthToken(emailFind);
      console.log(authToken);
      return Response.json({
        Success: true,
        AuthToken: authToken,
        msg: "Successfully Logged In",
      });
    } else {
      return Response.json({ Success: false, msg: "Wrong Password" });
    }
  } else {
    return Response.json({ Success: false, msg: "Please Register First" });
  }
}
