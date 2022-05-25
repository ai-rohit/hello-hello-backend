import jwt from "jsonwebtoken";
import { Document, ObjectId } from "mongoose";

export interface ITokenData {
  token: string;
  expiresIn: Date;
}

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  bio?: string;
  image?: string;
  phoneNumber?: string;
  email: string;
  role: string;
  tokenData?: ITokenData;
  generateJwtTokens(type: string): string;
  decodeJwt(type: string): string | jwt.JwtPayload;
  buildFilterQuery: (req: any) => any;
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

export interface IFriendReq extends Document {
  sender: ObjectId;
  receiver: ObjectId;
  status: string;
}

interface IBlockStatus {
  isBlocked: boolean;
  blockedBy: ObjectId;

}

export interface IFriendShip extends Document {
  friend1: ObjectId;
  friend2: ObjectId;
  status: string;
  blockedStatus: IBlockStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRoom extends Document {
  name: string;
  participants: Array<ObjectId>;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  message?: string;
  messageType:string;
  sender: ObjectId;
  // receiver: ObjectId;
  seen: Array<ObjectId>;
  roomId: ObjectId;
  attachment?: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date; 
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
