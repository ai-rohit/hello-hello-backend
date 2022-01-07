import mongoose from "mongoose";
import { IUser } from "../interfaces";
import { BaseModel } from "./base.model";

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
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

const User = mongoose.model("User", userSchema);
export class UserModel extends BaseModel {
  constructor() {
    super(User);
  }
}
