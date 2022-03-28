import mongoose from "mongoose";
import { IMessage } from "@interfaces";

const messageSchema = new mongoose.Schema<IMessage>({
  message: String,
  messageType:{
    type:String,
    required: true
  },
  sender:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  seen: [{
    type:mongoose.Schema.Types.ObjectId, 
    ref:"User"
    }],
  roomId:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:"Room"
  },
  attachment:String,
  image: String
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);

export { Message };