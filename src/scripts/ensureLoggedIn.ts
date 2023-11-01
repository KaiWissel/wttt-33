import { redirectToHome, retrieveUserRole } from "../utils/handleLogin";

const role = retrieveUserRole();

if (!role) {
  redirectToHome();
}
