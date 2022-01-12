/**
  Generates a random token of 5 digit for user auth
  @returns Random string
 */
function generateRandomToken(): string {
  return (Math.floor(Math.random() * 90000) + 100000).toString();
}

export { generateRandomToken };
