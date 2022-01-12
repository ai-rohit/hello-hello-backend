import { Document } from "mongoose";

export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser extends Document {
  email: string;
  tokenData?: ITokenData;
}

export * from "./model.interface";
export * from "./populate.interface";
