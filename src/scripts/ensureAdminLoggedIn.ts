import { redirectToHome, retrieveUserRole } from "../utils/handleLogin";

const role = retrieveUserRole();

if (!role || role != "Admin") {
  // User is not a admin
  redirectToHome();
}
