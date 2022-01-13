import mongoose from "mongoose";
import { IUser } from "../interfaces";
import { BaseModel } from "./base.model";
import jwt from "jsonwebtoken";

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

userSchema.methods.generateJwtTokens = function(type: string){
  if(type==="access"){
    return jwt.sign({ user: this._id }, process.env.JWT_SECRET as string, {
      expiresIn: "15m"
    })
  }

  if(type==="refresh"){
    return jwt.sign({ user: this._id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d"
    })
  }
}

const User = mongoose.model<IUser>("User", userSchema);
export class UserModel extends BaseModel {
  constructor() {
    super(User);
  }
}
