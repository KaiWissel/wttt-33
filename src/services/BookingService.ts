import logger from "../logger";
import prisma from "../plugins/prisma-client";
import type { BookingAddEditType, BookingRequestType } from "../types/Booking";

export async function findBookings(request: BookingRequestType) {
  return await prisma.booking.findMany({
    skip: request.skip,
    take: request.take ?? 50,
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
  logger.debug("BS: Will try to delete booking");

  const res = await prisma.booking.delete({
    where: {
      id,
    },
  });
  logger.debug("BS: Delete booking");

  return res;
}

export async function updateBooking(id: string, data: BookingAddEditType) {
  logger.debug("BS: Will update booking");
  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: {
      action: data.action,
      userId: data.userId,
      location: data.location,
      bookingTime: data.bookingTime,
    },
  });
  logger.debug("BS: booking updated");

  return updatedBooking;
}
