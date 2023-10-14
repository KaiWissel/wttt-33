import type { ZodObject, ZodRawShape } from "zod";
import logger from "../logger";

export function parseRequestParams<T extends ZodRawShape>(
  request: Request,
  zodRequestObject: ZodObject<T>
) {
  logger.debug("Parse request params");
  return zodRequestObject.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );
}

export function parseParams<T extends ZodRawShape>(
  params: Object,
  zodRequestObject: ZodObject<T>
) {
  logger.debug("Parse request params");
  return zodRequestObject.parse(params);
}

export async function parseRequestBody<T extends ZodRawShape>(
  request: Request,
  zodRequestObject: ZodObject<T>
) {
  logger.debug("Parse request body");
  return zodRequestObject.parse(await request.json());
}
