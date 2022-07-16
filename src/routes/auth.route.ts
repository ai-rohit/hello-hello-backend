import { Router } from "express";
import { validateEmail, validateEmailVerification } from "@validators";
import { handleErrors, wrapSync } from "@helpers";
import { login, verifyUser, getAccessToken, logout } from "@controllers";
import { verifyLogin } from "@middlewares";

const authRouter = Router();

// const auth = new AuthController();

authRouter.post("/login", validateEmail(), handleErrors, wrapSync(login));

authRouter.post(
  "/verify-user",
  validateEmailVerification(),
  handleErrors,
  wrapSync(verifyUser)
);

authRouter.post("/access-token", wrapSync(getAccessToken));

authRouter.post("/logout", verifyLogin, wrapSync(logout));

export default authRouter;
