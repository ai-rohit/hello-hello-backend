import { IUser } from "@interfaces";
import { UserModel, FriendReq, FriendShip } from "@models";
import { Request, Response } from "express"; 

//add sender and requester data in friendReq model with status as pending
export const sendFriendReq = async (req: Request, res: Response) => {
  const sender  = req.currentUser._id;
  const { receiver } = req.body;
  const userModel = new UserModel();
  
  const dbUser = await userModel.findById<IUser>(receiver);

  if(!dbUser){
    return res.status(400).send("User not found");
  }
  
  const newReq = new FriendReq({
    sender,
    receiver
  })

  const result = await newReq.save();

  return res.status(200).json(result);
};

//change status to accepted
// add data to friendship table
export const acceptRequest = async (req: Request, res: Response) => {
  const requestId = req.body.requestId;
  const user = req.currentUser._id;

  const request = await FriendReq.findOne({ _id: requestId, receiver: user });

  if(!request){
    return res.status(400).send("The request seems to be invalid")
  }

  request.status = "accepted";
  await request.save();

  const newFriendShip = new FriendShip({
    friend1: user,
    friend2: request.sender,
  })
  
  const friends = await newFriendShip.save();

  return res.status(200).json(friends);
}

//change status to rejected
export const rejectRequest = async (req: Request, res: Response)=>{
  const requestId = req.body.requestId;
  const user = req.currentUser._id;

  const request = await FriendReq.findOne({ _id: requestId, receiver: user });

  if(!request){
    return res.status(400).send("The request seems to be invalid")
  }

  request.status = "rejected";
  const result = await request.save();

  return res.status(200).json(result);
}

