const bcrypt = require("bcrypt");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";
const saltRounds = 10;

export async function POST(req) {
  const { name, email, password } = await req.json();
  console.log(name, password, email);
  if (!name || !email || !password) {
    return Response.json({ Success: false, message: "Missing fields" });
  }

  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const userExistsEmail = await User.findOne({ email });
    const userExistsUsername = await User.findOne({ username: name });
    if (userExistsEmail || userExistsUsername) {
      return Response.json({ Success: false, message: "User already exists" });
    }

    const userSave = new User({
      username: name,
      email,
      password: encryptedPassword,
    });
    await User.create(userSave);

    return Response.json({
      Success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ Success: false, message: "Server error", error });
  }
}
