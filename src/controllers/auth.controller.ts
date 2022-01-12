// import {User} from "../models";

import { Request, Response } from "express";
import { UserModel, ProfileModel } from "../models";
import { BaseController } from "./base.controller";
import { generateRandomToken, mailer } from "../helpers";
import { IModel, ITokenData, IUser, IProfile } from "../interfaces";
class AuthController extends BaseController {
  public profileModel: IModel;
  constructor() {
    super(new UserModel());
    this.profileModel = new ProfileModel();
  }

  async login(req: Request, res: Response) {
    const { email } = req.body;
    const user = await this.model.findOne<IUser>({ email });

    const tokenData: ITokenData = {
      token: generateRandomToken(),
      expiresIn: new Date(new Date().getTime() + 600000),
    }

    if (user) {
      user.tokenData = tokenData;
      mailer.sendMail({ from:"abc", to:"shrestharohit553@gmail.com", subject:"User verification mail", message:"Verify yourselt using token", data:tokenData.token })
      await user.save();

      const userProfile = await this.profileModel.findOne<IProfile>({ user: user._id });
      return this.successRes({
        mailToCheck: user.email, isNewUser: userProfile ? false : true
      }, res);
    }

    const result = await this.model.create<IUser>({
      email,
      tokenData
    });
    
    return this.successRes({
      mailToCheck: result.email,
      isNewUser: true
    }, res)
  }

  // async verifyUser(req: Request, res: Response){
  //   const { email, token } =  req.body;
  //   const user = await this.model.findOne({email});
    
  // }
}

export { AuthController };