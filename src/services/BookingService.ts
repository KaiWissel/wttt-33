import { PrismaClient } from "@prisma/client";
import type { BookingRequestType } from "../types/Booking";

const prisma = new PrismaClient();

export async function findBookings(res: BookingRequestType) {
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
