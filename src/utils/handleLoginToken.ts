import jwt_decode from "jwt-decode";

export const LOGIN_TOKEN = "wttt-33-login-token";
export const LOGIN_ROLE = "wttt-33-login-role";

interface JwtPayload {
  role: "Admin" | "Viewer";
  iat: number;
  exp: number;
}

function decode(token: string) {
  return jwt_decode(token) as JwtPayload;
}

export function getLoggedInRole() {
  return localStorage.getItem(LOGIN_ROLE);
}

export function storeToken(token: string) {
  const decoded = decode(token);
  localStorage.setItem(LOGIN_TOKEN, token);
  localStorage.setItem(LOGIN_ROLE, decoded.role);
}

export function clearToken() {
  localStorage.removeItem(LOGIN_TOKEN);
  localStorage.removeItem(LOGIN_ROLE);
}
