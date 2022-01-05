import { Router, Response } from "express";

const router: any = Router();

/**
 * @route GET/auth
 * @desc create user
 * @access authenticated
 */
router.get("/", (res: Response) => {
  res.status(200).json("200");
});

export default router;
