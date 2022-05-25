import { Router, Request, Response } from "express";
import { validateEmail, validateEmailVerification } from "@validators";
import { handleErrors, wrapSync } from "@helpers";
import { login, verifyUser, getAccessToken } from "@controllers";

const authRouter = Router();

// const auth = new AuthController();

authRouter.post(
  "/login",
  validateEmail(),
  handleErrors,
  wrapSync(login)
);

authRouter.post(
  "/verify-user",
  validateEmailVerification(),
  handleErrors,
  wrapSync(verifyUser)
);

authRouter.post(
  "/access-token",
  wrapSync(getAccessToken)
);

export default authRouter;
