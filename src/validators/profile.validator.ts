import { body, ValidationChain } from "express-validator";
/**
 * validation when creating user profile
 */
function validateProfileData(): Array<ValidationChain> {
  return [
    body("firstName")
      .exists()
      .withMessage("First name is missing")
      .not()
      .isEmpty()
      .withMessage("First name is required")
      .isString()
      .withMessage("First name must be made of alphabet")
      .trim()
      .escape(),
    body("lastName")
      .exists()
      .withMessage("Last name is missing")
      .not()
      .isEmpty()
      .withMessage("Last name is required")
      .isString()
      .withMessage("Last name must be made of alphabet")
      .trim()
      .escape(),
  ];
}

/**
 *
 * @returns validation chain
 */
function validateProfileForUpdate(): Array<ValidationChain> {
  return [
    body("firstName")
      .optional()
      .isString()
      .withMessage("First name must be made of alphabet")
      .trim()
      .escape(),
    body("lastName")
      .optional()
      .isString()
      .withMessage("Last name must be made of alphabet")
      .trim()
      .escape(),
    body("username")
      .optional()
      .isString()
      .withMessage("Invalid value for username")
      .trim()
      .escape(),
    body("phone")
      .optional()
      .isMobilePhone("ne-NP")
      .withMessage("Invalid phone number")
      .trim()
      .escape()
  ];
}

export { validateProfileData, validateProfileForUpdate };
