import { NextFunction, Request, Response } from "express";
import { encryptData, generateRandomToken, mailer, verifyJwt } from "@helpers";
import { ITokenData, IUser } from "@interfaces";
import { User } from "@models";

export const login = async (req: Request, res: Response, _: NextFunction) => {
  const { email } = req.body;
  let user = await User.findOne<IUser>({
    email,
  });
  const tokenData: ITokenData = {
    token: generateRandomToken(),
    expiresIn: new Date(new Date().getTime() + 600000),
  };
  const mailPayload = {
    from: "Hello Hello Chat",
    subject: "User verification mail",
    message: "Verify yourself using token",
    data: tokenData.token,
  };
  let mailToCheck = "";
  let encryptedString = "";

  if (user) {
    user.tokenData = tokenData;
  } else {
    user = new User({
      email,
      tokenData,
    });
    //send mail
  }
  await user.save();
  mailer.sendMail({
    ...mailPayload,
    to: user.email,
  });

  const dataToEnc: string = user.email + ":" + new Date();
  encryptedString = encryptData(dataToEnc);
  mailToCheck = user.email;

  return res.status(200).json({
    mailToCheck,
    hashedToken: encryptedString,
  });
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, token } = req.body;
  const user = await User.findOne<IUser>({ email });
  if (!user) {
    return res.status(404).json("User not found");
  }
  if (user.tokenData) {
    if (user.tokenData.token === token && user.tokenData.expiresIn > token) {
      //create jwt
      let hasProfile = false;
      const accessToken: string = user.generateJwtTokens("access");
      const refreshToken: string = user.generateJwtTokens("refresh");

      if (user.firstName && user.lastName) hasProfile = true;

      //removing user token data
      user.tokenData = undefined;
      await user.save();
      return res.status(200).json({ accessToken, refreshToken, hasProfile });
    }
    return res.status(400).json("Sorry, token doesn't match");
  }
  return res.status(500).json("Something went wrong");
};

export const getAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json("Refresh token is required");
  }
  let decoded: any;
  try {
    decoded = verifyJwt(refreshToken, "refresh");
  } catch (err) {
    console.log(err);
    return res.status(400).json("The token seems to be invalid");
  }

  if (decoded) {
    if (decoded.type !== "refresh") {
      return res.status(400).json("The refresh token seems to be invalid");
    }
    const user = await User.findById<IUser>(decoded.user);
    if (!user)
      return res.status(404).json("Something went wrong when getting user");

    const accesstoken = user.generateJwtTokens("access");
    return res.status(200).json({
      accesstoken,
    });
  } else {
    return res.status(400).json("Invalid referesh token");
  }
};
//   async getAccessToken(req: Request, res: Response) {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return this.failureRes(400, "Refresh token is required", res);
//     }
//     let decoded: any;
//     try {
//       decoded = verifyJwt(refreshToken, "refresh");
//     } catch (err) {
//       return this.failureRes(404, "The token seems to be invalid", res);
//     }
//     if (decoded) {
//       if (decoded.type !== "refresh") {
//         return this.failureRes(
//           400,
//           "The refresh token seems to be invalid",
//           res
//         );
//       }

//       const user = await this.model.findById<IUser>(decoded.user);
//       console.log(user);
//       if (!user)
//         return this.failureRes(
//           404,
//           "something went wrong when getting user",
//           res
//         );

//       const accesstoken = user.generateJwtTokens("access");
//       return this.successRes({ accesstoken }, res);
//     }
//   }
// }
