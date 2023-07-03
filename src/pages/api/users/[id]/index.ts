import type { APIRoute } from "astro";
import { deleteUser } from "../../../../services/UserService";
import { IdParam } from "../../../../types/Common";
import { parseParams, parseRequestBody } from "../../../../utils/apiRequests";
import { UserAddEditRequest } from "../../../../types/User";

export const del: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
    const res = await deleteUser(requestParams.id);
    return {
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      body: JSON.stringify(error),
    };
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
