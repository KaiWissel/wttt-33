import type { APIRoute } from "astro";
import { findUsers, createUser } from "../../../services/UserService";
import { UserRequest, UserAddEditRequest } from "../../../types/User";
import {
  parseRequestBody,
  parseRequestParams,
} from "../../../utils/requestParsing";
import { handleErrorRequest } from "../../../utils/errorHandling";
import { handleSuccessful } from "../../../utils/handleResponse";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const res = parseRequestParams(request, UserRequest);
    const result = await findUsers(res);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};

export const post: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestBody = await parseRequestBody(request, UserAddEditRequest);
    const result = await createUser(requestBody);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};
