import { verify } from "jsonwebtoken";

/**
  Generates a random token of 5 digit for user auth
  @returns Random string
 */
function generateRandomToken(): string {
  return (Math.floor(Math.random() * 90000) + 100000).toString();
}
/**
 * 
 * @param token 
 * @returns payload
 */
function verifyJwt(token: string, tokenType: string){
  const secret = tokenType === "access"? process.env.JWT_ACCESS_SECRET as string: process.env.JWT_REFRESH_SECRET as string
  return verify(token, secret)
}

export { generateRandomToken, verifyJwt };
