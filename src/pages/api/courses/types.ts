import type { APIRoute } from "astro";
import { findCourseTypes } from "../../../services/CourseService";
import { handleRequest } from "../../../utils/handleRequest";

export const GET: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    return await findCourseTypes();
  });
};
