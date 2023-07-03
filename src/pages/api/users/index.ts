import type { APIRoute } from "astro";
import { findUsers, createUser } from "../../../services/UserService";
import { UserRequest, UserAddEditRequest } from "../../../types/User";
import {
  handleErrorRequest,
  parseRequestBody,
  parseRequestParams,
} from "../../../utils/apiRequests";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const res = parseRequestParams(request, UserRequest);
    const result = await findUsers(res);

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

export const post: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestBody = await parseRequestBody(request, UserAddEditRequest);
    const result = await createUser(requestBody);

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
