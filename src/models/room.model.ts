import mongoose from "mongoose";
import { IRoom } from "@interfaces";

const roomSchema = new mongoose.Schema<IRoom>({
  name: {
    type:String,
    required: true
  },
  participants:{
    type:[{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref:"User" 
    }],
    required: true,
  }
},{ timestamps:true });

const Room = mongoose.model("Room", roomSchema);

export { Room };