import { NextFunction, Request, Response } from "express";
import { User } from "@models";
import jwt from "jsonwebtoken";
import { IUser } from "@interfaces";

export const verifyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  // const userModel = new UserModel();

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    try {
      let decoded: any;

      try {
        decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);
      } catch (err) {
        return res.status(401).json({
          status: "token_not_valid",
          message: "Given token is invalid or expired",
        });
      }
      if (decoded.type !== "access") {
        return res.status(403).json({
          status: "error",
          message: "Frobidden",
        });
      }
      const user = await User.findById<IUser>(decoded.user);

      if (!user) {
        return res.status(401).json({
          status: "error",
          message: "The user no longer exists",
        });
      }

      req.currentUser = user;
      return next();
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: "error",
        message: "Something went wrong",
      });
    }
  } else {
    return res.status(401).json({
      status: "error",
      message: "Authentication credentials were not provided.",
    });
  }
};

/**
  * @description access token expired response
  * 401 unauthorized
  {
      "detail": "Given token not valid for any token type",
      "code": "token_not_valid",
      "messages": [
          {
              "token_class": "AccessToken",
              "token_type": "access",
              "message": "Token is invalid or expired"
          }
      ]
  }
 */
/**
 * @description refresh token endpoint response
 * {
      "access": "jwt token"
  }
*/

/**
  * @description refresh token expired response
  {
    "refresh": [
      "This field is required."
    ]
  }
 */
