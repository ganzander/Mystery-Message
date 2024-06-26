const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
import connectToDatabase from "../../../connection/mongoConnect";
import User from "../../../models/user";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function POST(req) {
  const { email } = await req.json();
  const OTP = Math.floor(100000 + Math.random() * 900000);
  const query = { email: email };
  const UserFound = await User.findOne(query);

  if (UserFound) {
    const updateData = await User.updateOne(
      { email: email },
      { $set: { otp: OTP } },
      { new: true }
    );
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Sending EMAIL for OTP Validation",
      text: `OTP: ${OTP}`,
    };
    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Email Sent");
      }
    });
    return Response.json({
      Success: true,
      user: UserFound,
    });
  } else {
    return Response.json({ Success: false });
  }
}
