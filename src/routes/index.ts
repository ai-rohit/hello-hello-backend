import { Router } from "express";
import auth from "./auth.route";
import profile from "./profile.route";
import user from "./user.route";
import room from "./room.route";

const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", profile);
routes.use("/users", user);
routes.use("/rooms", room);

export default routes;
