import { PrismaClient } from "@prisma/client";
import type { BookingRequestType } from "../types/Booking";

const prisma = new PrismaClient();

export async function findBookings(request: BookingRequestType) {
  return await prisma.booking.findMany({
    skip: request.skip,
    take: request.take,
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
