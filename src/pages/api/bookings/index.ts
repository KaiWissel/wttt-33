import type { APIRoute } from "astro";
import { findBookings } from "../../../services/BookingService";
import { BookingRequest } from "../../../types/Booking";
import { handleErrorRequest, parseRequest } from "../../../utils/apiRequests";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

  try {
    const res = parseRequest(request, BookingRequest);
    const result = await findBookings(res);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
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
