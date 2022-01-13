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
}

export { ProfileController };