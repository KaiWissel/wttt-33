import type { APIRoute } from "astro";
import { createCourse, findCourses } from "../../../services/CourseService";
import { CourseRequest } from "../../../types/Courses";
import { parseRequestBody } from "../../../utils/requestParsing";
import { handleRequest } from "../../../utils/handleRequest";

export const GET: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    return await findCourses();
  });
};

export const POST: APIRoute = async ({ request }) => {
  return handleRequest(request, async () => {
    const requestBody = await parseRequestBody(request, CourseRequest);
    return await createCourse(requestBody);
  });
};
