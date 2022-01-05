import { Router, Response, Request } from "express";

const router = Router();

/**
 * @route GET/POST/PUT/DELETE auth
 * @desc user authentication
 * @access allow all
 */
router.get("/", (req: Request, res: Response) => {
  res.send("Hello Hello Chat");
});

export default router;
