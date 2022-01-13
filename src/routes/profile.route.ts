import { Router, Request, Response } from "express";
import { verifyLogin } from "@middlewares";
import { ProfileController } from "../controllers";

const profileRouter = Router();

const profile = new ProfileController();

profileRouter.get("/me", verifyLogin, (req: Request, res:Response)=>profile.myProfile(req, res))
profileRouter.post("/create", verifyLogin, (req:Request, res:Response)=>profile.createUserProfile(req, res));


export default profileRouter;