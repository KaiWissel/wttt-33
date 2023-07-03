import type { APIRoute } from "astro";
import { findBookings } from "../../../services/BookingService";
import { BookingRequest } from "../../../types/Booking";
import { parseRequestParams } from "../../../utils/requestParsing";
import { handleErrorRequest } from "../../../utils/errorHandling";
import { handleSuccessful } from "../../../utils/handleResponse";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

  try {
    const res = parseRequestParams(request, BookingRequest);
    const result = await findBookings(res);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};

export const post: APIRoute = ({ request }) => {
  return {
    body: JSON.stringify({
      message: "Das war ein POST!",
    }),
  };
};
