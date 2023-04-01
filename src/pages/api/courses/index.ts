import type { APIRoute } from "astro";
import { findCourses } from "../../../services/CourseService";
import { CourseRequest } from "../../../types/Courses";
import {
  handleErrorRequest,
  parseRequestParams,
} from "../../../utils/apiRequests";

export const get: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

  try {
    const res = parseRequestParams(request, CourseRequest);
    const result = await findCourses(res);

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
