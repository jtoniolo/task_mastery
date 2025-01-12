export function decodeJWTToken(token: string) {
  return JSON.parse(atob(token.split('.')[1]));
}
