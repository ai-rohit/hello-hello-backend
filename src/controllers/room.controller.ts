import { Room } from "@models";
import { Request, Response } from "express";

export const getMyRooms = async (req: Request, res: Response) => {
  const user = req.currentUser;
  console.log(user._id);
  const filter = {
    participants: user._id,
  };
  console.log(filter);
  const rooms = await Room.find(filter).populate("messages").exec();
  console.log(rooms);
  return res.status(200).json(rooms);
};
