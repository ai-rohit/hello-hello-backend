import { Message } from "@models";
import { Request, Response } from "express";
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
  const filter = {
    roomId: query.roomId,
  };

  const pageNum = Number(query.page) || 1;
  const limit: number = Number(query.limit) || pageConfig.pageLimit;

  const skip = (pageNum - 1) * limit;

  const messages = await Message.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  return res.status(200).json(messages);
};
