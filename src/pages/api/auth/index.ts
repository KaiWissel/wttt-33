import type { APIRoute } from "astro";
import { login } from "../../../services/AuthService";
import { AuthRequest } from "../../../types/Auth";
import { parseRequestBody } from "../../../utils/requestParsing";
import { handleError, handleSuccessful } from "../../../utils/handleResponse";
import logger from "../../../logger";

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const body = await parseRequestBody(request, AuthRequest);
    const token = await login(body);

    if (!token) {
      logger.warn("A: Wrong credentials");
      return new Response(null, { status: 401 });
    }

    return handleSuccessful(token);
  } catch (error) {
    return handleError(error);
  }
};
