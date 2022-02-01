import { IProfile } from "@interfaces";
import { ProfileModel } from "@models";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";

class ProfileController extends BaseController{
  constructor(){
    super(new ProfileModel());
  }

  async createUserProfile(req: Request, res: Response){
    const newProfile = await this.model.create<IProfile>({ ...req.body, user: req.currentUser._id });
    return this.successRes(newProfile, res);
  }

  async myProfile(req: Request, res: Response){
    const profile = await this.model.findOne<IProfile>({ user: req.currentUser._id }, { path: "user" });
    this.successRes(profile, res);
  }

  async updateProfile(req: Request, res: Response){
    const { firstName, lastName, username, bio } = req.body;
    const profile = await this.model.findOne<IProfile>({ user: req.currentUser._id });
    if(!profile){
      return this.failureRes(404,"Couldn't find profile for user", res);
    }

    if(firstName) profile.firstName = firstName;
    if(lastName) profile.lastName = lastName;
    if(username) profile.username = username;
    if(bio) profile.bio = bio;

    const result: IProfile = await profile.save();
    return this.successRes(result, res);
  }

  async changeAvatar(req: Request, res:Response){
    return res.json({
      status:"Working"
    })
  }
}

export { ProfileController };