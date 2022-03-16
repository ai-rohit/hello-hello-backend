import mongoose from "mongoose";
import { IFriendReq } from "../interfaces";

const friendReqSchema = new mongoose.Schema<IFriendReq>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status:{
    type: String,
    required: true,
    default: "pending"
  }
}, { timestamps: true });

const FriendReq = mongoose.model("FriendReq", friendReqSchema);

export { FriendReq };