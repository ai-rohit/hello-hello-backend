import express from "express";
import { findUser } from "@controllers";
const router = express.Router();

// router.get("/:id", );
router.get("/search", findUser);

export default router;
