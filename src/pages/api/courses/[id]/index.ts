import type { APIRoute } from "astro";
import { deleteCourse, updateCourse } from "../../../../services/CourseService";
import { IdParam } from "../../../../types/Common";
import { parseParams, parseRequestBody } from "../../../../utils/apiRequests";
import { CourseRequest } from "../../../../types/Courses";

export const del: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
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

export const put: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
    const requestBody = await parseRequestBody(request, CourseRequest);
    const res = await updateCourse(requestParams.id, requestBody);
    return {
      body: JSON.stringify(res),
    };
  } catch (error) {
    return {
      body: JSON.stringify(error),
    };
  }
};
