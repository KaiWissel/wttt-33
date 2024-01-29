import type { APIRoute } from "astro";
import { createBookingFromTerminal } from "../../../services/BookingService";
import { BookingTerminalRequest } from "../../../types/Booking";
import { parseRequestBody } from "../../../utils/requestParsing";
import { handleRequest } from "../../../utils/handleRequest";

export const POST: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    const req = await parseRequestBody(request, BookingTerminalRequest);
    return await createBookingFromTerminal(req);
  });
};
