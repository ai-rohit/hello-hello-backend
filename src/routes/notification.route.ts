import { Router } from "express";
import { wrapSync } from "@helpers";
import { getDeviceToken } from "@controllers";
import { verifyLogin } from "@middlewares";

const router = Router();

router.post("/notification-token", verifyLogin, wrapSync(getDeviceToken));

export default router;
