import { IModel } from "../interfaces";
import { Response } from "express";

export class BaseController {
  public model: IModel;

  constructor(model: IModel) {
    this.model = model;
  }

  successRes(data: any, res: Response) {
    return res.status(200).json(data);
  }

  failureRes(status = 500, message: any, res: Response) {
    return res.status(status).json({
      error: message,
    });
  }
}
