import type { APIRoute } from "astro";
import { deleteUser } from "../../../../services/UserService";
import { IdParam } from "../../../../types/Common";
import {
  parseParams,
  parseRequestBody,
} from "../../../../utils/requestParsing";
import { UserAddEditRequest } from "../../../../types/User";
import { handleErrorRequest } from "../../../../utils/errorHandling";
import { handleSuccessful } from "../../../../utils/handleResponse";

export const del: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
    const result = await deleteUser(requestParams.id);
    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};

// export const put: APIRoute = async ({ params, request }) => {
//   console.log("R: ", request.method, request.url);

//   try {
//     const requestParams = parseParams(params, IdParam);
//     const requestBody = await parseRequestBody(request, UserAddEditRequest);
//     const res = await updateUser(requestParams.id, requestBody);
//     return {
//       body: JSON.stringify(res),
//     };
//   } catch (error) {
//     return {
//       body: JSON.stringify(error),
//     };
//   }
// };
