import { Request, Response } from "express";
import { UserModel, FriendReq, FriendShip } from "@models";
import { IUser } from "@interfaces";

//add sender and requester data in friendReq model with status as pending
export const sendFriendReq = async (req: Request, res: Response) => {
  const sender = req.currentUser._id;
  const { receiver } = req.body;

  if (!receiver) {
    return res.status(400).json({
      receiver: "receiver is required",
    });
  }
  const userModel = new UserModel();

  const dbUser = await userModel.findById<IUser>(receiver);

  if (!dbUser) {
    return res.status(400).send("User not found");
  }

  const existingInvite = await FriendReq.findOne({
    $or: [
      { receiver, sender },
      { receiver: sender, sender: receiver },
    ],
  });
  if (existingInvite) {
    const status = existingInvite.status;
    if (status === "pending") {
      return res.status(400).json({
        invite:
          "There is already an existing connection pending to be accepted/rejected",
      });
    } else if (status === "accepted") {
      return res.status(400).json({
        invite: "User already in connection",
      });
    } else if (status === "rejected") {
      await existingInvite.remove();
    }
  }
  const newReq = new FriendReq({
    sender,
    receiver,
  });

  const result = await newReq.save();

  return res.status(200).json(result);
};

export const getAllInvites = async (req: Request, res: Response) => {
  const invites = await FriendReq.find({ receiver: req.currentUser._id });
  return res.status(200).json(invites);
};

export const getSentInvites = async (req: Request, res: Response) => {
  const invites = await FriendReq.find({ sender: req.currentUser._id });
  return res.status(200).json(invites);
};

export const getSingleInvites = async (req: Request, res: Response) => {
  const inviteId = req.params.inviteId;
  const invite = await FriendReq.findById(inviteId);

  if (!invite) {
    return res.status(404).json({
      invite: "Invite not found",
    });
  }
  return res.json(invite);
};

//change status to accepted
// add data to friendship table
export const acceptRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const user = req.currentUser._id;

  const request = await FriendReq.findOne({ _id: requestId, receiver: user });

  if (!request) {
    return res.status(400).send("The request seems to be invalid");
  }

  request.status = "accepted";
  await request.save();

  const newFriendShip = new FriendShip({
    friend1: user,
    friend2: request.sender,
  });

  const friends = await newFriendShip.save();

  return res.status(200).json(friends);
};

//change status to rejected
export const rejectRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const user = req.currentUser._id;

  const request = await FriendReq.findOne({ _id: requestId, receiver: user });

  if (!request) {
    return res.status(400).send("The request seems to be invalid");
  }

  request.status = "rejected";
  const result = await request.save();

  return res.status(200).json(result);
};

export const deleteRequest = async (req: Request, res: Response) => {
  const requestId = req.params.requestId;
  const user = req.currentUser._id;

  const request = await FriendReq.findOne({ _id: requestId, receiver: user });

  if (!request) {
    return res.status(400).send("The request seems to be invalid");
  }

  await request.remove();
  return res.status(200).json({});
};
