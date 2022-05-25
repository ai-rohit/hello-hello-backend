import { Router } from "express";
import auth from "./auth.route";
// import inviteRouter from "./invite.route";
import profile from "./profile.route";
import user from "./user.route";

const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", profile);
// routes.use("/invites", inviteRouter);
routes.use("/users", user)

export default routes;
