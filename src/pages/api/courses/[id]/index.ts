import type { APIRoute } from "astro";
import { deleteCourse, updateCourse } from "../../../../services/CourseService";
import { IdParam } from "../../../../types/Common";
import {
  parseParams,
  parseRequestBody,
} from "../../../../utils/requestParsing";
import { CourseRequest } from "../../../../types/Courses";
import { handleErrorRequest } from "../../../../utils/errorHandling";
import { handleSuccessful } from "../../../../utils/handleResponse";

export const del: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
    const result = await deleteCourse(requestParams.id);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};

export const put: APIRoute = async ({ params, request }) => {
  console.log("R: ", request.method, request.url);

  try {
    const requestParams = parseParams(params, IdParam);
    const requestBody = await parseRequestBody(request, CourseRequest);
    const result = await updateCourse(requestParams.id, requestBody);

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
};
