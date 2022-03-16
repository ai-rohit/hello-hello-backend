import { param, ValidationChain } from "express-validator";

export const singleInviteRequests = () : Array<ValidationChain> => {
  return [
    param("inviteId", "Invalid invite id").exists().not().isEmpty().withMessage("Invite id must be provide")
  ]
}