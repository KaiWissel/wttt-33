import { handleErrorRequest } from "./errorHandling";
import { handleSuccessful } from "./handleResponse";

export async function handleRequest(request: Request, callable: Function) {
  console.log("R: ", request.method, request.url);

  try {
    const result = await callable();

    return handleSuccessful(result);
  } catch (error) {
    return handleErrorRequest(error);
  }
}
