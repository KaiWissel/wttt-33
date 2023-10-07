import type { APIRoute } from "astro";
import {
  deleteBooking,
  updateBooking,
} from "../../../../services/BookingService";
import { IdParam } from "../../../../types/Common";
import {
  parseParams,
  parseRequestBody,
} from "../../../../utils/requestParsing";
import { handleRequest } from "../../../../utils/handleRequest";
import { BookingAddEditRequest } from "../../../../types/Booking";

export const DELETE: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    return await deleteBooking(requestParams.id);
  });
};

export const PUT: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    const requestBody = await parseRequestBody(request, BookingAddEditRequest);
    return await updateBooking(requestParams.id, requestBody);
  });
};
