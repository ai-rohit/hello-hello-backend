import { Request, Response } from "express";
import { unlinkSync } from "fs";
import { IProfile } from "@interfaces";
import { ProfileModel } from "@models";
import { BaseController } from "./base.controller";

class ProfileController extends BaseController {
  constructor() {
    super(new ProfileModel());
  }

  async createUserProfile(req: Request, res: Response) {
    const profile = await this.model.findOne<IProfile>({
      user: req.currentUser._id,
    });
    if (profile) {
      return this.failureRes(401, "The user already has a profile.", res);
    }
    const newProfile = await this.model.create<IProfile>({
      ...req.body,
      user: req.currentUser._id,
    });
    return this.successRes(newProfile, res);
  }

  async myProfile(req: Request, res: Response) {
    const profile = await this.model.findOne<IProfile>(
      { user: req.currentUser._id },
      { path: "user" }
    );

    return this.successRes(profile, res);
  }

  async updateProfile(req: Request, res: Response) {
    const { firstName, lastName, username, bio, phone } = req.body;
    const profile = await this.model.findOne<IProfile>({
      user: req.currentUser._id,
    });
    if (!profile) {
      return this.failureRes(404, "Couldn't find profile for user", res);
    }

    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (username){
      const userWithUsernm = await this.model.findOne<IProfile>({
        username
      })
      if(!userWithUsernm){
        profile.username = username;
      }else{
        return this.failureRes(400, "Username already taken", res);
      }
    } 
    if (phone){
      const userWithPhone = await this.model.findOne<IProfile>({
        phoneNumber: phone
      })
      if(!userWithPhone){
        profile.phoneNumber = phone;
      }else{
        return this.failureRes(400, "Phone number already in use", res);
      }
    } 
    if (bio) profile.bio = bio;

    const result: IProfile = await profile.save();
    return this.successRes(result, res);
  }

  async changeAvatar(req: Request, res: Response) {
    if (!req.file) {
      return this.failureRes(400, "Image is required for upload", res);
    }
    const profile = await this.model.findOne<IProfile>({
      user: req.currentUser._id,
    });
    let result;
    if (profile) {
      if (profile.image && profile.image !== "uploads/default.jpeg") {
        unlinkSync(profile.image);
      }
      profile.image = req.file?.path;
      result = await profile.save();
    } else {
      result = await this.model.create<IProfile>({
        user: req.currentUser._id,
        image: req.file.path,
      });
    }
    this.successRes(result, res);
  }
}

export { ProfileController };
