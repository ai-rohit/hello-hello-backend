import { body, ValidationChain } from "express-validator";


/**
 * Validation for user verification while logging in 
 *
 */
function validateEmailVerification(): Array<ValidationChain>{
  return [
    body("email", "Invalid email address").not().isEmpty().isEmail().withMessage("Email format incorrect"),
    body("token", "InvalidToken").not().isEmpty().isLength({ min:6,max:6 }).withMessage("Token length must be 6")
  ]
}

export {
  validateEmailVerification
}