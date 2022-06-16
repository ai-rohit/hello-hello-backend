import { Router } from "express";
import { getMyRooms } from "@controllers";
import { wrapSync } from "@helpers";
import { verifyLogin } from "@middlewares";

const router = Router();

router.get("/", verifyLogin, wrapSync(getMyRooms));

export default router;
