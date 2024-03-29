import type { APIRoute } from "astro";
import { deleteUser, updateUser } from "../../../../services/UserService";
import { IdParam } from "../../../../types/Common";
import {
  parseParams,
  parseRequestBody,
} from "../../../../utils/requestParsing";
import { UserAddEditRequest } from "../../../../types/User";
import { handleRequest } from "../../../../utils/handleRequest";

export const DELETE: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    return await deleteUser(requestParams.id);
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    const requestBody = await parseRequestBody(request, UserAddEditRequest);
    return await updateUser(requestParams.id, requestBody);
  });
};
