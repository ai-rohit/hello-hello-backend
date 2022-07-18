import { Request, Response } from "express";
import { Message, Room } from "@models";
import { pageConfig } from "@constants";

export const getRoomMessages = async (req: Request, res: Response) => {
  const { query } = req;
  const sort = {
    createdAt: -1,
  };
  if (!query.roomId) {
    return res.status(400).json({
      detail: "Room not selected for messages!",
    });
  }

  const room = await Room.findById(query.roomId);
  if (!room) {
    return res.status(404).json({
      detail: "Room not found",
    });
  }

  const filter = {
    roomId: query.roomId,
  };

  const pageNum = Number(query.page) || 1;
  const limit: number = Number(query.limit) || pageConfig.pageLimit;

  const skip = (pageNum - 1) * limit;

  const messages = await Message.find(filter)
    .populate({
      path: "sender",
      select: ["id", "image", "firstName", "lastName", "username"],
    })
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return res.status(200).json(messages);
};
