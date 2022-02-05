import { Router, Request, Response } from "express";
import { verifyLogin } from "@middlewares";
import { ProfileController } from "../controllers";
import { validateProfileData, validateProfileForUpdate } from "../validators";
import { handleErrors, uploadImage, wrapSync } from "../helpers";

const profileRouter = Router();

const profile = new ProfileController();

profileRouter.put("/", verifyLogin, validateProfileForUpdate(), handleErrors, (req: Request, res:Response)=> profile.updateProfile(req, res));
profileRouter.post("/create", validateProfileData(), handleErrors, verifyLogin, (req:Request, res:Response)=>profile.createUserProfile(req, res));
profileRouter.get("/me", verifyLogin,wrapSync((req: Request, res:Response)=>profile.myProfile(req, res)))
profileRouter.post("/me/profile-image", verifyLogin, uploadImage, wrapSync((req: Request, res:Response)=> profile.changeAvatar(req, res)))


export default profileRouter;