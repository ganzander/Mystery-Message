const mongoose = require("mongoose");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

export async function POST(req) {
  const { username, content } = await req.json();
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      return Response.json({ Success: false, msg: "User not found" });
    }

    if (!userFound.isAcceptingMessages) {
      return Response.json({
        Success: false,
        msg: "User is not accepting messages.",
      });
    }

    const newMessage = {
      _id: new mongoose.Types.ObjectId(),
      content,
      createdAt: new Date(),
    };

    const updatedUser = await User.updateOne(
      { username },
      {
        $push: { messages: newMessage },
      }
    );

    return Response.json({ Success: true, msg: "Message sent to user." });
  } catch (error) {
    return Response.json({ Success: false, msg: error }, { status: 404 });
  }
}
