import { Request, Response } from "express";
import { User } from "@models";
import { IUser } from "@interfaces";

export const getUserByEmail = async (req: Request, res: Response) => {
  const email: string = req.params.email;

  const user = await User.findOne<IUser>({ email });

  if (!user) {
    return res.status(404).json({
      user: "User not found",
    });
  }
  return res.status(200).json(user);
};

export const findUser = async (req: Request, res: Response) => {
  const { searchText } = req.query;
  const filterQuery: any = {
    $and: [
      {
        _id: {
          $ne: req.currentUser._id,
        },
      },
    ],
  };
  if (searchText) {
    filterQuery["$and"].push({
      $or: [
        {
          email: searchText,
        },
        {
          username: {
            $regex: searchText,
          },
        },
      ],
    });
  }
  const userFromEmail = await User.find<IUser>(filterQuery, [
    "firstName",
    "lastName",
    "username",
    "image",
    "email",
  ]);
  return res.json(userFromEmail);
};
