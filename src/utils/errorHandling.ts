export function handleErrorRequest(error: unknown) {
  console.log("AR: An error occurred");
  console.log(JSON.stringify(error, null, 2));

  return new Response(JSON.stringify(error, null, 2), {
    status: 400,
  });
}
