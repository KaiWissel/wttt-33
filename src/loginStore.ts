import { atom } from "nanostores";

export const isLoggedIn = atom(false);
export const isAdmin = atom(false);

export function logIn(user: string, password: string) {
  console.log("Login: ", user, password);

  isLoggedIn.set(true);

  if (user == "Admin") {
    isAdmin.set(true);
  }
}

export function logOff() {
  console.log("Logoff");

  isLoggedIn.set(false);
  isAdmin.set(false);
}
