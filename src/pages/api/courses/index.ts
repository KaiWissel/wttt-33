import type { APIRoute } from "astro";
import { createCourse, findCourses } from "../../../services/CourseService";
import { CourseRequest, NewCourseRequest } from "../../../types/Courses";
import {
  handleErrorRequest,
  parseRequestParams,
} from "../../../utils/apiRequests";
import { parseRequestBody } from "../../../utils/apiRequests";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

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
  console.log("R: ", request.url);

  const requestBody = await parseRequestBody(request, NewCourseRequest);
  const newCourse = await createCourse(requestBody);
  return {
    body: JSON.stringify(newCourse),
  };
};
