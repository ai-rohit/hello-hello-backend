// import {User} from "../models";
import { Request, Response } from "express";
import { UserModel, ProfileModel } from "@models";
import { BaseController } from "./base.controller";
import { generateRandomToken, mailer } from "@helpers";
import { IModel, ITokenData, IUser, IProfile } from "@interfaces";

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
    };

    if (user) {
      user.tokenData = tokenData;
      mailer.sendMail({
        from: "poonprakash22@gmail.com",
        to: user.email,
        subject: "User verification mail",
        message: "Verify yourself using token",
        data: tokenData.token,
      });
      await user.save();

      const userProfile = await this.profileModel.findOne<IProfile>({
        user: user._id,
      });
      return this.successRes(
        {
          mailToCheck: user.email,
          isNewUser: userProfile ? false : true,
        },
        res
      );
    }

    const result = await this.model.create<IUser>({
      email,
      tokenData,
    });
    //send mail
    return this.successRes(
      {
        mailToCheck: result.email,
        isNewUser: true,
      },
      res
    );
  }

  async verifyUser(req: Request, res: Response) {
    const { email, token } = req.body;
    const user = await this.model.findOne<IUser>({ email });

    if (!user) {
      return this.failureRes(400, "User not found", res);
    }

    if (user.tokenData) {
      if (user.tokenData.token === token && user.tokenData.expiresIn > token) {
        //create jwt
        //remove token for user
        user.tokenData = undefined;
        await user.save();
        return this.successRes(
          {
            token: "asdasdasd2818917u8e9u131h2euadas876dgajsd97sadgbsaudyaisd",
          },
          res
        );
      }
      return this.failureRes(400, "Sorry, token doesn't match", res);
    }
    return this.failureRes(500, "Something went wrong", res);
  }
}

export { AuthController };
