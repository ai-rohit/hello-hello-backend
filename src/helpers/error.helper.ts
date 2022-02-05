import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationError } from "express-validator";

/**
 * error catcher from express validator
 */
function handleErrors(req: Request, res: Response, next: NextFunction){
  const errorFormatter = ({ msg, param }: ValidationError)=>{
    return `${ param }: ${msg}`
  }
  //const allErrors: any = {};
  const result = validationResult(req).formatWith(errorFormatter);

  if (!result.isEmpty()) {
    console.log(result);
    return res.status(400).json({ errors: result.array({ onlyFirstError: true }) });
  }
  return next();
}

export { handleErrors }
