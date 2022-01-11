import { Router, Request, Response } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

const auth = new AuthController();
authRouter.post("/login", (req: Request, res: Response) => auth.login(req, res))

export default authRouter;