import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models";
import jwt from "jsonwebtoken";
import { IUser } from "@interfaces";

export const verifyLogin = async(req: Request, res: Response, next: NextFunction)=>{
  let token: string;
  const userModel = new UserModel();
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);

    const user = await userModel.findById<IUser>(decoded.user);

    if(!user){
      return res.status(401).json({
        status:"error",
        message:"The user no longer exists"
      })
    }

    req.currentUser = user;
    return next();
  }else{
    return res.status(401).json({
      status:"error",
      message: "401!!! user not logged in"
    })
  }

}