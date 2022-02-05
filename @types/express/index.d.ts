import { IUser } from "@interfaces";

declare global {
  namespace Express {
    interface Request {
      currentUser: IUser;
    }
  }
}
