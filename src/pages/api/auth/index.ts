import type { APIRoute } from "astro";
import { login } from "../../../services/AuthService";
import { AuthRequest } from "../../../types/Auth";
import {
  handleErrorRequest,
  parseRequestBody,
} from "../../../utils/apiRequests";

export const post: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

  try {
    const body = await parseRequestBody(request, AuthRequest);
    const result = await login(body);

    if (!result) {
      console.log("A: Wrong credentials");
      return new Response(null, { status: 401 });
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return handleErrorRequest(error);
  }
};
