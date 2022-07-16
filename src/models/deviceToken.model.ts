import mongoose from "mongoose";
import { IDeviceToken } from "@interfaces";

const deviceTokenSchema = new mongoose.Schema<IDeviceToken>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tokens: {
    type: [
      {
        type: String,
      },
    ],
  },
});

const DeviceToken = mongoose.model("DeviceToken", deviceTokenSchema);

export { DeviceToken };
