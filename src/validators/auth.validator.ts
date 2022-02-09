import { body, ValidationChain } from "express-validator";

/**
 * Validation for user verification while logging in
 *
 */
function validateEmailVerification(): Array<ValidationChain> {
  return [
    body("email", "Invalid email address")
      .exists()
      .withMessage("Email is missing")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Email format incorrect"),
    body("token", "Invalid Token")
      .exists()
      .withMessage("Token is missing")
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 6 })
      .withMessage("Token length must be 6"),
  ];
}

/**
 *
 * @returns validation chain for email
 */
function validateEmail(): Array<ValidationChain> {
  return [
    body("email", "Invalid email address")
      .exists()
      .withMessage("Email is missing")
      .not()
      .isEmpty()
      .isEmail()
      .withMessage("Email format incorrect"),
  ];
}

export { validateEmailVerification, validateEmail };
