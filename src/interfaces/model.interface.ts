import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
import { IPopulate } from "./populate.interface";

export interface IModel {
  model: mongoose.Model<any>;
  create<T>(document: any): Promise<T>;
  findById<T>(id: string, populate?: IPopulate): Promise<T>;
  findOne<T>(query: any, populate?: IPopulate): Promise<T>;
  findMany<T>(query: any, populate?: IPopulate): Promise<any[] | T>;
  updateById<T>(
    id: string,
    document: any,
    populate?: IPopulate | IPopulate[]
  ): Promise<T>;
  deleteById<T>(id: string): Promise<T>;
  //decodeJwt? : (token?: string)=> string | JwtPayload;
}
