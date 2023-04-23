import { PrismaClient } from "@prisma/client";
import type { UserRequestType } from "../types/User";

const prisma = new PrismaClient();

export async function findUsers(res: UserRequestType) {
  return await prisma.user.findMany({
    skip: res.skip,
    take: res.take,
    orderBy: [
      {
        lastName: "asc",
      },
      {
        firstName: "asc",
      },
    ],
    include: {
      course: {
        select: {
          courseTypeShortName: true,
          year: true,
        },
      },
    },
  });
}
