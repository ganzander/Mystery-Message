const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Not Valid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    otp: {
      type: Number,
      default: null,
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
    messages: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
