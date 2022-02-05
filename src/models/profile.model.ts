import mongoose from "mongoose";
import { BaseModel } from "./base.model";
import { IProfile } from "../interfaces";

const profileSchema = new mongoose.Schema<IProfile>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    image:{
        type: String,
        default: "uploads/default.jpeg"
    }
    // preference:{
    //     buttonColor:"blue",
    //     mode:"dark"
    // }
})

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export class ProfileModel extends BaseModel {
  constructor() {
    super(Profile);
  }
}
