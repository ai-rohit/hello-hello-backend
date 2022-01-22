import { Document, ObjectId } from "mongoose";

export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser extends Document {
  email: string;
  tokenData?: ITokenData;
}

export interface IProfile extends Document {
  firstName: string;
  lastName: string;
  username: string;
  avatar: string;
  role: string;
  bio: string;
  user: ObjectId;
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
