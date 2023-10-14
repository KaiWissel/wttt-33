import { PrismaClient } from "@prisma/client";
import type { UserRequestType, UserAddEditType } from "../types/User";
import logger from "../logger";

const prisma = new PrismaClient();

export async function findUsers(req: UserRequestType) {
  return await prisma.user.findMany({
    skip: req.skip,
    take: req.take ?? 50,
    where: {
      uId: {
        contains: req.uId,
      },
      firstName: {
        contains: req.firstName,
      },
      lastName: {
        contains: req.lastName,
      },
      course: {
        courseTypeShortName: {
          contains: req.courseType,
        },
        year: req.year,
      },
    },
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

export async function createUser(data: UserAddEditType) {
  logger.debug("US: Will create new user");
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      uId: data.uId,
      courseId: data.courseId,
    },
  });
  logger.debug("US: New user created");

  return newUser;
}

export async function updateUser(id: string, data: UserAddEditType) {
  logger.debug("US: Will update user");
  const newUser = await prisma.user.update({
    where: { id },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      uId: data.uId,
      courseId: data.courseId,
    },
  });
  logger.debug("US: user updated");

  return newUser;
}

export async function deleteUser(id: string) {
  logger.debug("US: Will try to delete user");

  const res = await prisma.user.delete({
    where: {
      id,
    },
  });
  logger.debug("US: User deleted");

  return res;
}
