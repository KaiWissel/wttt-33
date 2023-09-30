import type { APIRoute } from "astro";
import { findUsers, createUser } from "../../../services/UserService";
import { UserRequest, UserAddEditRequest } from "../../../types/User";
import {
  parseRequestBody,
  parseRequestParams,
} from "../../../utils/requestParsing";
import { handleRequest } from "../../../utils/handleRequest";

export const GET: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const res = parseRequestParams(request, UserRequest);
    return await findUsers(res);
  });
};

export const POST: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    const requestBody = await parseRequestBody(request, UserAddEditRequest);
    return await createUser(requestBody);
  });
};
