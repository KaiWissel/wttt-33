import prisma from "../plugins/prisma-client";
import type { BookingRequestType } from "../types/Booking";

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

export async function deleteBooking(id: string) {
  console.log("US: Will try to delete booking");

  const res = await prisma.booking.delete({
    where: {
      id,
    },
  });
  console.log("US: User booking");

  return res;
}
