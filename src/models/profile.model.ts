import mongoose from "mongoose";
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
  image: {
    type: String,
    default: "uploads/default.jpeg",
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  // preference:{
  //     buttonColor:"blue",
  //     mode:"dark"
  // }
});

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export { Profile };
