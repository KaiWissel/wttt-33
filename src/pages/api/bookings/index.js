export const get = ({ params, request }) => {
  return {
    body: JSON.stringify({
      message: "Das war ein GET!",
    }),
  };
};

export const post = ({ request }) => {
  return {
    body: JSON.stringify({
      message: "Das war ein POST!",
    }),
  };
};
