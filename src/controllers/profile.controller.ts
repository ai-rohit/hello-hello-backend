import { NextFunction, Request, Response } from "express";
import { unlinkSync } from "fs";
import { IUser } from "@interfaces";
import { User } from "@models";

// export const createUserProfile = async(req: Request, res: Response, next: NextFunction)=>{
//   // const user = await User.findById<IUser>(req.currentUser._id);
//   // if(!user){
//   //   return res.status(404).json("Couldn't find the user for profile")
//   // }
//   // if(user.firstName || user.lastName){
//   //   return res.
//   // }
// //     const newProfile = await this.model.create<IProfile>({
// //       ...req.body,
// //       user: req.currentUser._id,
// //     });
// //     return this.successRes(newProfile, res);
// //   }

// //   async myProfile(req: Request, res: Response) {
// //     const profile = await this.model.findOne<IProfile>(
// //       { user: req.currentUser._id },
// //       { path: "user" }
// //     );

// //     return this.successRes(profile, res);
// }

export const myProfile = async(req: Request, res: Response, next: NextFunction)=>{
  const user = await User.findById(req.currentUser._id);
  if(!user) return res.status(400).json("Couldn't get profile of the user")
  return res.status(200).json(user);
}

export const updateProfile = async(req: Request, res: Response, next: NextFunction)=>{
  const { firstName, lastName, username, bio, phone } = req.body;
  const profile = await User.findById<IUser>(req.currentUser._id);
  if (!profile) {
    return res.status(404).json("Couldn't find user to update profile")
  }

  if (firstName) profile.firstName = firstName;
  if (lastName) profile.lastName = lastName;
  if (username){
    const userWithUsernm = await User.findOne<IUser>({
      username
    })
    if(!userWithUsernm){
      profile.username = username;
    }else{
      return res.status(400).json("Username already taken");
    }
  } 
  if (phone){
    const userWithPhone = await User.findOne<IUser>({
      phoneNumber: phone
    })
    if(!userWithPhone){
      profile.phoneNumber = phone;
    }else{
      return res.status(400).json("Phone number already in use");
    }
  } 
  if (bio) profile.bio = bio;
  const result: IUser = await profile.save();
  return res.status(200).json(result)
}

export const changeAvatar = async(req: Request, res: Response, next: NextFunction)=>{
    if (!req.file) {
      return res.status(400).json("Image is required for upload");
    }
    const profile = await User.findById<IUser>(req.currentUser._id);
    let result;
    if (profile) {
      if (profile.image && profile.image !== "uploads/default.jpeg") {
        unlinkSync(profile.image);
      }
      profile.image = req.file?.path;
      result = await profile.save();
      return res.status(200).json(result);
    } else {
      return res.status(404).json("Coudln't find user for image upload")
    }
}
