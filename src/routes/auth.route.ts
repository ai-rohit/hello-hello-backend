import { wrapSync } from "@helpers";
import { Router, Request, Response } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

const auth = new AuthController();
authRouter.post("/login", wrapSync((req: Request, res: Response) => auth.login(req, res)));
authRouter.post("/verify-user", (req: Request, res: Response)=> auth.verifyUser(req, res));

export default authRouter;