import type { APIRoute } from "astro";
import { deleteBooking } from "../../../../services/BookingService";
import { IdParam } from "../../../../types/Common";
import { parseParams } from "../../../../utils/requestParsing";
import { handleRequest } from "../../../../utils/handleRequest";

export const DEL: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    return await deleteBooking(requestParams.id);
  });
};

// export const PUT: APIRoute = async ({ params, request }) => {
//   return handleRequest(request, async () => {
//     const requestParams = parseParams(params, IdParam);
//     const requestBody = await parseRequestBody(request, UserAddEditRequest);
//     return await updateUser(requestParams.id, requestBody);
//   });
// };
