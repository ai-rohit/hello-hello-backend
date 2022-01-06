import mongoose from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    bio: {
      type: String,
    },
    tokenData: {
      token: {
        type: String,
      },
      expiresIn: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User };
