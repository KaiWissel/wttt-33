const { PUBLIC_API_URL } = import.meta.env;

export async function fetchGet(route: String) {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/${route}`);

    await checkErrorResponse(res);
    return await res.json();
  } catch (error) {
    logError(route, error);
  }
}

export async function fetchPost<T>(route: String, requestBody: T) {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    await checkErrorResponse(res);
    return res;
  } catch (error) {
    logError(route, error);
  }
}

export async function fetchPut<T>(route: String, requestBody: T) {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/${route}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    await checkErrorResponse(res);
    return res;
  } catch (error) {
    logError(route, error);
  }
}

export async function fetchDelete(route: String) {
  try {
    const res = await fetch(`${PUBLIC_API_URL}/api/${route}`, {
      method: "DELETE",
    });

    await checkErrorResponse(res);
    return res;
  } catch (error) {
    logError(route, error);
  }
}

export async function checkErrorResponse(res: Response) {
  if (res.status != 200) {
    throw JSON.stringify(await res.json(), null, 2);
  }
}

function logError(route: String, error: unknown) {
  console.log("Error on request to " + route);
  console.log(error);
}
