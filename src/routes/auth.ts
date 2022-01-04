import express, { Response } from "express";

const router = express.Router();

router.get("/", (res: Response) => {
    return res.send("Hello World");
});

export default router;