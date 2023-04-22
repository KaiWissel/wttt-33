import type { APIRoute } from "astro";
import { deleteCourse } from "../../../../services/CourseService";
import { DeleteRequest } from "../../../../types/Common";
import { parseParams } from "../../../../utils/apiRequests";

export const del: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.url);

  try {
    const requestParams = parseParams(params, DeleteRequest);
    const res = await deleteCourse(requestParams.id);
    return {
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      body: JSON.stringify(error),
    };
  }
};
