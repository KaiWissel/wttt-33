import type { APIRoute } from "astro";
import { createCourse, findCourses } from "../../../services/CourseService";
import { CourseRequest } from "../../../types/Courses";
import { handleErrorRequest } from "../../../utils/apiRequests";
import { parseRequestBody } from "../../../utils/apiRequests";

export const get: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const result = await findCourses();

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

export const post: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  const requestBody = await parseRequestBody(request, CourseRequest);
  const newCourse = await createCourse(requestBody);
  return {
    body: JSON.stringify(newCourse),
  };
};
