import mongoose from "mongoose";
import { IRoom } from "@interfaces";

//room type 0 for private and 1 for group
const roomSchema = new mongoose.Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
    },
    roomType: {
      type: Number,
      required: true,
      default: 0,
      enum: [0, 1],
    },
    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

roomSchema.virtual("recentMessages", {
  ref: "Message",
  foreignField: "roomId",
  localField: "_id",
  options: { sort: { createdAt: -1 }, limit: 2 },
});

const Room = mongoose.model("Room", roomSchema);

export { Room };
