import type { APIRoute } from "astro";
import { findCourseTypes } from "../../../services/CourseService";

export const get: APIRoute = async ({ request }) => {
  console.log("R: ", request.method, request.url);

  const result = await findCourseTypes();

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
