import { Router } from "express";
import auth from "./auth.route";
import profile from "./profile.route";

const routes = Router();

routes.use("/auth", auth);
routes.use("/profile", profile)

export default routes;
