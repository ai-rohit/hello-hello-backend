import { Request, Response, NextFunction } from "express";

export const wrapSync = (fn: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch((err: Error) => {
      console.log(err);
      return res.json({
        status: "error",
        message: err.message,
      });
    });
  };
};
