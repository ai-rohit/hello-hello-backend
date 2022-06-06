import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "@interfaces";

const userSchema = new mongoose.Schema<IUser>(
  {
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
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    tokenData: {
      token: {
        type: String,
      },
      expiresIn: {
        type: Date,
      },
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

// userSchema.virtual("profile", {
//   ref:"Profile",
//   foreignField:"user",
//   localField:"_id"
// })

interface jwtPayload {
  user: string;
  type: string;
}

userSchema.methods.generateJwtTokens = function (type: string) {
  const payload: jwtPayload = {
    user: this._id,
    type,
  };

  if (type === "access") {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
      expiresIn: "2d",
    });
  }

  if (type === "refresh") {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
      expiresIn: "30d",
    });
  }
};

userSchema.statics.buildFilterQuery = (req) => {
  const { query } = req;
  const filter: any = {};

  if (query.searchText) {
    filter["$or"] = [
      {
        email: query.searchText,
      },
      {
        username: {
          $regex: query.searchText,
        },
      },
    ];
  }

  return filter;
};

const User = mongoose.model("User", userSchema);

export { User };
