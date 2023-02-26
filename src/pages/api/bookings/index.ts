import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";

const prisma = new PrismaClient();

export const get: APIRoute = async ({ params, request }) => {
  console.log("test");

  const result = await prisma.courseType.findMany();

  return {
    body: JSON.stringify({
      message:
        "Grüße von der WTTT-33 API. Das war ein GET! " + result[0].shortName,
    }),
  };
};

export const post: APIRoute = ({ request }) => {
  return {
    body: JSON.stringify({
      message: "Das war ein POST!",
    }),
  };
};
