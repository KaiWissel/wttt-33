import { LOGIN_TOKEN } from "../utils/handleLoginToken";

export default function redirectIfNotLoggedIn() {
  document.addEventListener("DOMContentLoaded", function (event) {
    // Code, der ausgeführt wird, wenn das DOM vollständig geladen ist
    console.log("loaded");
    const token = localStorage.getItem(LOGIN_TOKEN);

    if (token) return;
    redirectToNewHome();
  });
}

function redirectToNewHome() {
  window.location.href = "/";
}
