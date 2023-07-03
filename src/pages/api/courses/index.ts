import type { APIRoute } from "astro";
import { createCourse, findCourses } from "../../../services/CourseService";
import { CourseRequest } from "../../../types/Courses";
import { parseRequestBody } from "../../../utils/requestParsing";
import { handleErrorRequest } from "../../../utils/errorHandling";
import { handleSuccessful } from "../../../utils/handleResponse";

export const get: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const result = await findCourses();

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};

export const post: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestBody = await parseRequestBody(request, CourseRequest);
    const result = await createCourse(requestBody);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};
