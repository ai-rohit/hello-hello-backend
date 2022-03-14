import { Request, Response } from "express";
import { UserModel } from "@models";
import { IUser } from "@interfaces";

const userModel = new UserModel();

export const getUserByEmail = async (req:Request, res:Response) => {
  const email: string = req.params.email;

  const user = await userModel.findOne<IUser>({ email });

  if(!user){
    return res.status(404).json({
      user: "User not found"
    })
  }
  return res.status(200).json(user);
}