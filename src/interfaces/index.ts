import jwt from "jsonwebtoken";
import { Document, ObjectId } from "mongoose";

export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser extends Document {
  email: string;
  role: string;
  tokenData?: ITokenData;
  generateJwtTokens(type: string): string;
  decodeJwt(type: string): string | jwt.JwtPayload;
}

export interface IProfile extends Document {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  bio: string;
  user: ObjectId;
  image: string;
  phoneNumber: string;
}

export interface MailParam {
  from: string;
  to: string;
  subject: string;
  message: string;
  data: string;
}

export * from "./model.interface";
export * from "./populate.interface";
