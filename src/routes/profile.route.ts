import { Router } from "express";
import { validateProfileForUpdate } from "@validators";
import { handleErrors, uploadImage, wrapSync } from "@helpers";
import { updateProfile, myProfile, changeAvatar } from "@controllers";
import { verifyLogin } from "@middlewares";

const profileRouter = Router();

// const profile = new ProfileController();

// profileRouter.post(
//   "/create",
//   validateProfileData(),
//   handleErrors,
//   verifyLogin,
//   wrapSync((req: Request, res: Response) => profile.createUserProfile(req, res))
// );

profileRouter.patch(
  "/",
  verifyLogin,
  validateProfileForUpdate(),
  handleErrors,
  wrapSync(updateProfile)
);

profileRouter.get(
  "/me",
  verifyLogin,
  wrapSync(myProfile)
);

profileRouter.post(
  "/me/profile-image",
  verifyLogin,
  uploadImage,
  wrapSync(changeAvatar)
);

export default profileRouter;
