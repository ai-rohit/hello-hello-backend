import { Response } from "express";
import jwt from "jsonwebtoken";
import { Document, ObjectId, Types } from "mongoose";
import { Socket } from "socket.io";

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
  roomType: number;
  participants: Array<Types.ObjectId>;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage extends Document {
  message?: string;
  messageType: string;
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

export interface ISocket extends Socket {
  user?: IUser;
}

export interface IResponse extends Response {
  io?: any;
}

export interface INotification {
  sender: ObjectId;
  receiver: ObjectId;
  roomId: ObjectId;
  type: string;
  isRead: boolean;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDeviceToken extends Document {
  userId: ObjectId;
  tokens: Array<string>;
}

export * from "./model.interface";
export * from "./populate.interface";
