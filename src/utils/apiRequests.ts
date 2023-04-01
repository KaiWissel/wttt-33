import type { ZodObject, ZodRawShape } from "zod";

export function handleErrorRequest(error: unknown) {
  console.log(JSON.stringify(error, null, 2));

  return new Response(JSON.stringify(error, null, 2), {
    status: 400,
  });
}

export function parseRequestParams<T extends ZodRawShape>(
  request: Request,
  zodRequestObject: ZodObject<T>
) {
  return zodRequestObject.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );
}

export async function parseRequestBody<T extends ZodRawShape>(
  request: Request,
  zodRequestObject: ZodObject<T>
) {
  return zodRequestObject.parse(await request.json());
}
