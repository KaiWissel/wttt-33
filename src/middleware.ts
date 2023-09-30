import { defineMiddleware } from "astro:middleware";

import logger from "./logger.ts";

export const onRequest = defineMiddleware((context, next) => {
  const { method, url, bodyUsed, body } = context.request;
  logger.info(method + ": " + url);

  if (bodyUsed) {
    logger.debug(body);
  }

  next();
});
