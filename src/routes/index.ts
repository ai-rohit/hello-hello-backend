import { Router } from "express";
import auth from "./auth.route";
import profile from "./profile.route";
import user from "./user.route";
import room from "./room.route";
import message from "./message.route";

const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", profile);
routes.use("/users", user);
routes.use("/rooms", room);
routes.use("/messages", message);

export default routes;
