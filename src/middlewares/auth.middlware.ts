import { NextFunction, Request, Response } from "express";
import { UserModel } from "@models";
import jwt from "jsonwebtoken";
import { IUser } from "@interfaces";

export const verifyLogin = async(req: Request, res: Response, next: NextFunction)=>{
  let token: string;
  const userModel = new UserModel();
  
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
    token = req.headers.authorization.split(" ")[1];
    try{
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      if(decoded.type !== "access"){
        return res.status(403).json({
          status:"error",
          message:"Frobidden"
        })
      }
      const user = await userModel.findById<IUser>(decoded.user);
  
      if(!user){
        return res.status(401).json({
          status:"error",
          message:"The user no longer exists"
        })
      }
  
      req.currentUser = user;
      return next();
    }catch(err){
      console.log(err);
      res.status(500).json({
        status:"error",
        message:"Something went wrong"
      })
    }

  }else{
    return res.status(401).json({
      status:"error",
      message: "401!!! user not logged in"
    })
  }

}