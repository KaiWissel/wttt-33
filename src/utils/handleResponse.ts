import logger from "../logger";

export function handleSuccessful(payload: any) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function handleError(error: unknown) {
  logger.error("HR: An error occurred");
  logger.error(JSON.stringify(error, null, 2));

  return new Response(JSON.stringify(error, null, 2), {
    status: 400,
  });
}
