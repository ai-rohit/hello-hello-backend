import express from "express";
import { findUser } from "@controllers";
import { verifyLogin } from "@middlewares";
const router = express.Router();

// router.get("/:id", );
router.get("/search", verifyLogin, findUser);

export default router;
