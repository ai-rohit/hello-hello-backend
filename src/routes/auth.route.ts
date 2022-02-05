import { handleErrors, wrapSync } from "@helpers";
import { Router, Request, Response } from "express";
import { validateEmail, validateEmailVerification } from "../validators";
import { AuthController } from "../controllers";

const authRouter = Router();

const auth = new AuthController();
authRouter.post("/login",validateEmail(), handleErrors, wrapSync((req: Request, res: Response) => auth.login(req, res)));
authRouter.post("/verify-user", validateEmailVerification(),handleErrors, wrapSync((req: Request, res: Response)=> auth.verifyUser(req, res)));
authRouter.post("/access-token", wrapSync((req: Request, res: Response)=> auth.getAccessToken(req, res)))

export default authRouter;