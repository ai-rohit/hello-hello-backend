import { Router } from "express";
import { getRoomMessages } from "@controllers";
import { wrapSync } from "@helpers";
import { verifyLogin } from "@middlewares";

const router = Router();

router.get("/", verifyLogin, wrapSync(getRoomMessages));

export default router;
