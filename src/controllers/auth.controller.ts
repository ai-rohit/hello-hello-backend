// import {User} from "../models";
import { Request, Response } from "express";
import { UserModel, ProfileModel } from "@models";
import { BaseController } from "./base.controller";
import { generateRandomToken } from "@helpers";
import { IModel, ITokenData, IUser } from "@interfaces";
class AuthController extends BaseController {
  public profileModel: IModel;
  constructor() {
    super(new UserModel());
    this.profileModel = new ProfileModel();
  }

  async login(req: Request, res: Response) {
    console.log(req.body.email);
    const { email } = req.body;
    const user = await this.model.findOne<IUser>({ email });
    console.log(1);
    const tokenData: ITokenData = {
      token: generateRandomToken(),
      expiresIn: new Date(new Date().getTime() + 600000),
    };
    if (user) {
      user.tokenData = tokenData;
      //send mail
      await user.save();
      console.log(user);
      return this.successRes(
        {
          mailToCheck: user.email,
          isNewUser: false,
        },
        res
      );
    }

    const result = await this.model.create<IUser>({
      email,
      tokenData,
    });
    return this.successRes(
      {
        mailToCheck: result.email,
        isNewUser: true,
      },
      res
    );
  }
}

export { AuthController };
