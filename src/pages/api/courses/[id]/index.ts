import type { APIRoute } from "astro";
import { deleteCourse, updateCourse } from "../../../../services/CourseService";
import { IdParam } from "../../../../types/Common";
import {
  parseParams,
  parseRequestBody,
} from "../../../../utils/requestParsing";
import { CourseRequest } from "../../../../types/Courses";
import { handleRequest } from "../../../../utils/handleRequest";

export const del: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    return await deleteCourse(requestParams.id);
  });
};

export const put: APIRoute = async ({ params, request }) => {
  return handleRequest(request, async () => {
    const requestParams = parseParams(params, IdParam);
    const requestBody = await parseRequestBody(request, CourseRequest);
    return await updateCourse(requestParams.id, requestBody);
  });
};
