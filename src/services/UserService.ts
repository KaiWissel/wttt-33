import { PrismaClient } from "@prisma/client";
import type { UserRequestType, UserAddEditType } from "../types/User";

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

export async function createUser(data: UserAddEditType) {
  console.log("US: Will create new user");
  const newUser = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      status: data.status,
      uId: data.uId,
      courseId: data.courseId,
    },
  });
  console.log("US: New user created");

  return newUser;
}

// export async function updateUser(id: string, data: UserRequestType) {
//   console.log("US: Will update user");
//   const newUser = await prisma.user.update({
//     where: { id },
//     data: { courseTypeShortName: data.shortName, year: data.year },
//   });
//   console.log("US: user updated");

//   return newUser;
// }

export async function deleteUser(id: string) {
  console.log("US: Will try to delete user");

  const res = await prisma.user.delete({
    where: {
      id,
    },
  });
  console.log("US: User deleted");

  return res;
}
