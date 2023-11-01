import jwt_decode from "jwt-decode";

export const LOGIN_TOKEN = "wttt-33-login-token";

export interface JwtPayload {
  role: "Admin" | "Viewer";
  iat: number;
  exp: number;
}

function decode(token: string) {
  return jwt_decode(token) as JwtPayload;
}

export function storeToken(token: string) {
  const decoded = decode(token);
  localStorage.setItem(LOGIN_TOKEN, token);
}

export function clearToken() {
  localStorage.removeItem(LOGIN_TOKEN);
}

export function redirectToHome() {
  window.location.href = "/";
}

export function retrieveUserRole() {
  const token = localStorage.getItem(LOGIN_TOKEN);

  if (!token) {
    return null;
  }

  const userRole = decode(token).role;
  console.log("User has role:", userRole);

  return userRole;
}
