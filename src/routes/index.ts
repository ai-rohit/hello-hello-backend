import { Router } from "express";
import auth from "./auth.route";
import inviteRouter from "./invite.route";
import profile from "./profile.route";

const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", profile);
routes.use("/invites", inviteRouter);

export default routes;
