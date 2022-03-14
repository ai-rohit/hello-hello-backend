import { sendFriendReq } from "../controllers";
import { Router } from "express";
import { wrapSync } from "@helpers";

const friendRouter = Router();

friendRouter.post("/new-request", wrapSync(sendFriendReq));