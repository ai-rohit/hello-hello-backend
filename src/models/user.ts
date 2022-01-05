import mongoose from "mongoose";

interface User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatar?: string;
    role: string;
    bio?: string;
    tokenData?: any;
}
// interface UserModel extends mongoose.Model<User>{

// }

const userSchema = new mongoose.Schema<User>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "user"
    },
    bio: {
        type: String,
    },
    tokenData: {
        token: {
            type: String,
        },
        expiresIn: {
            type: Date,
        }
    }
}, { timestamps: true });

const User = mongoose.model<User>("User", userSchema);

export default User;