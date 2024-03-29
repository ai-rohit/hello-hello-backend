import { Room } from "@models";
import { Request, Response } from "express";

export const getMyRooms = async (req: Request, res: Response) => {
  const user = req.currentUser;
  const filter = {
    participants: user._id,
  };
  console.log(filter);
  const rooms = await Room.find(filter)
    .populate({
      path: "participants",
      select: ["username", "firstName", "lastName", "image"],
    })
    .populate("recentMessages");
  return res.status(200).json(rooms);
};

//no room
//recent messages
