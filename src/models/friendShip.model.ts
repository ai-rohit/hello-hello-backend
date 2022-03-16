import { IFriendShip } from "@interfaces";
import mongoose from "mongoose";

const friendShipSchema = new mongoose.Schema<IFriendShip>(
  {
    friend1: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    friend2: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      default: "friends",
    },
    blockedStatus: {
      isBlocked: {
        type: Boolean,
        default: false,
      },
      blockedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const FriendShip = mongoose.model("FriendShip", friendShipSchema);

export { FriendShip };
