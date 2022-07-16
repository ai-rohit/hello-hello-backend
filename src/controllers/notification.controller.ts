import { Request, Response } from "express";
import { DeviceToken } from "@models";
import { IDeviceToken } from "@interfaces";

export const getDeviceToken = async (req: Request, res: Response) => {
  const { deviceToken } = req.body;

  if (!deviceToken) {
    return res.status(400).json({
      detail: "Device token is required",
    });
  }
  let deviceTokens = await DeviceToken.findOne<IDeviceToken>({
    userId: req.currentUser._id,
  });

  if (!deviceTokens) {
    deviceTokens = new DeviceToken({
      userId: req.currentUser._id,
      tokens: [deviceToken],
    });
    deviceTokens = await deviceTokens.save();
  } else {
    if (!deviceTokens.tokens.includes(deviceToken)) {
      deviceTokens.tokens.push(deviceToken);
      deviceTokens = await deviceTokens.save();
    }
  }

  return res.status(200).json(deviceTokens);
};
