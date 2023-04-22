const { PUBLIC_API_URL } = import.meta.env;

export async function fetchGet(route: String) {
  const response = await fetch(`${PUBLIC_API_URL}/api/${route}`);
  return await response.json();
}

export async function fetchPost<T>(route: String, requestBody: T) {
  const response = await fetch(`${PUBLIC_API_URL}/api/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
}

export async function fetchPut<T>(route: String, requestBody: T) {
  const response = await fetch(`${PUBLIC_API_URL}/api/${route}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });
  return await response.json();
}

export async function fetchDelete(route: String) {
  return await fetch(`${PUBLIC_API_URL}/api/${route}`, {
    method: "DELETE",
  });
}
