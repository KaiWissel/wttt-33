import logger from "../logger";
import prisma from "../plugins/prisma-client";
import type {
  BookingAddEditType,
  BookingRequestType,
  BookingTerminalType,
} from "../types/Booking";

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

export async function createBookingFromTerminal(data: BookingTerminalType) {
  logger.debug("CS: Will create new booking from terminal");

  const userId = await findUserIdByUId(data.uId);

  const newBooking = await createBooking({
    ...data,
    userId,
    bookingTime: new Date().toISOString(),
  });

  logger.debug("CS: New course booking from terminal");

  return newBooking;
}

export async function createBooking(data: BookingAddEditType) {
  logger.debug("CS: Will create new booking");

  const newBooking = await prisma.booking.create({
    data: {
      action: data.action,
      location: data.location,
      bookingTime: data.bookingTime,
      userId: data.userId,
    },
  });
  logger.debug("CS: New course booking");

  return newBooking;
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

async function findUserIdByUId(uId: string) {
  const user = await prisma.user.findFirst({ where: { uId } });

  logger.debug(`BS: User entry found: ` + JSON.stringify(user, null, 2));

  if (!user?.id) throw new Error(`No user found for uId ${uId}`);

  return user.id;
}
