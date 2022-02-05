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
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
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

interface jwtPayload {
  user: string;
  type: string;
}

userSchema.methods.generateJwtTokens = function (type: string) {
  const payload: jwtPayload = {
    user: this._id,
    type,
  };

  if (type === "access") {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: "15m",
    });
  }

  if (type === "refresh") {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "30d",
    });
  }
};

const User = mongoose.model<IUser>("User", userSchema);
export class UserModel extends BaseModel {
  constructor() {
    super(User);
  }

  decodeJwt(token: string) {
    const decoded: string | undefined | any = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );
    return decoded;
  }
}
