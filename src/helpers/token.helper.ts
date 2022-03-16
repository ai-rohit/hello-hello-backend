import { verify } from "jsonwebtoken";
import CryptoJs from "crypto-js";

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
function verifyJwt(token: string, tokenType: string) {
  const secret =
    tokenType === "access"
      ? (process.env.JWT_ACCESS_SECRET as string)
      : (process.env.JWT_REFRESH_SECRET as string);
  return verify(token, secret);
}

/**
 * @param data
 * @return encrypted data
 */
function encryptData(data: string | any): string {
  const iv = CryptoJs.enc.Base64.parse("");
  const key = CryptoJs.SHA256(process.env.HASH_SECRET as string);

  const encryptedString: string = CryptoJs.AES.encrypt(data, key, {
    iv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
  }).toString();

  return encryptedString;
}

/**
 * @param encrypted
 * @return decryptedData
 */
function decryptData(encrypted: string | any): string {
  const iv = CryptoJs.enc.Base64.parse("");
  const key = CryptoJs.SHA256(process.env.HASH_SECRET as string);

  const decryptedString = CryptoJs.AES.decrypt(encrypted, key, {
    iv,
    mode: CryptoJs.mode.CBC,
    padding: CryptoJs.pad.Pkcs7,
  }).toString(CryptoJs.enc.Utf8);

  return decryptedString;
}

export { generateRandomToken, verifyJwt, encryptData, decryptData };
