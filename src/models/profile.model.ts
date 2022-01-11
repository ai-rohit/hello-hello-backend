import mongoose from "mongoose";
import { BaseModel } from "./base.model";

interface IProfile {
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    role: string;
    bio: string;
    user: mongoose.ObjectId
}

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
    role: {
        type: String,
        required: true,
        default: "user",
    },
    bio: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // preference:{
    //     buttonColor:"blue",
    //     mode:"dark"
    // }
})

const Profile = mongoose.model<IProfile>("Profile", profileSchema);

export class ProfileModel extends BaseModel {
    constructor() {
        super(Profile)
    }
}