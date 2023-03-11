import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function findBookings(res: any) {
  return await prisma.booking.findMany({
    skip: res.skip,
    take: res.take,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
          course: {
            select: {
              courseTypeShortName: true,
              year: true,
            },
          },
        },
      },
    },
  });
}
