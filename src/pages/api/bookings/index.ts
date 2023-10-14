import type { APIRoute } from "astro";
import { createBooking, findBookings } from "../../../services/BookingService";
import { BookingAddEditRequest, BookingRequest } from "../../../types/Booking";
import {
  parseRequestBody,
  parseRequestParams,
} from "../../../utils/requestParsing";
import { handleRequest } from "../../../utils/handleRequest";

export const GET: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const req = parseRequestParams(request, BookingRequest);
    return await findBookings(req);
  });
};

export const POST: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    const req = await parseRequestBody(request, BookingAddEditRequest);
    return await createBooking(req);
  });
};
