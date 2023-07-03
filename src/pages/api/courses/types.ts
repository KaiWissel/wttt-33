import type { APIRoute } from "astro";
import { findCourseTypes } from "../../../services/CourseService";
import { handleSuccessful } from "../../../utils/handleResponse";
import { handleErrorRequest } from "../../../utils/errorHandling";

export const get: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const result = await findCourseTypes();

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};
