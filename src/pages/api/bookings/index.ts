import type { APIRoute } from "astro";
import { findBookings } from "../../../services/BookingService";
import { BookingRequest } from "../../../types/Booking";
import { parseRequestParams } from "../../../utils/requestParsing";
import { handleRequest } from "../../../utils/handleRequest";

export const get: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const res = parseRequestParams(request, BookingRequest);
    return await findBookings(res);
  });
};

export const post: APIRoute = ({ request }) => {
  return {
    body: JSON.stringify({
      message: "Das war ein POST!",
    }),
  };
};
