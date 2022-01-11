import { Document } from "mongoose";

export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser extends Document {
  email: string;
  tokenData?: ITokenData;
}

export * from "./IModel.interface";
export * from "./IPopulate.interface";