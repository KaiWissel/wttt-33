import logger from "../logger";
import prisma from "../plugins/prisma-client";
import type { BookingAddEditType, BookingRequestType, BookingTerminalType } from "../types/Booking";

export async function findBookings(request: BookingRequestType) {
  const whereUser = createWhereStatementForName(request.name);
  const whereCourse = createWhereStatementForCourse(request.course);

  return await prisma.booking.findMany({
    skip: request.skip,
    take: request.take ?? 50,
    where: {
      AND: [
        { location: { contains: request.location } },
        {
          bookingTime: {
            gt: createDateFromString(request.from),
          },
        },
        {
          bookingTime: {
            lt: createDateFromString(request.till),
          },
        },
        { user: { ...whereUser, course: whereCourse } },
      ],
    },
    orderBy: {
      bookingTime: "desc",
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

  const user = await findUserByUId(data.uId);

  const newBooking = await createBooking({
    ...data,
    userId: user.id,
    bookingTime: new Date().toISOString(),
  });

  logger.debug("CS: New course booking from terminal");

  const bookingWithUser = {
    userFirstName: user.firstName,
    userLastName: user.lastName,
    ...newBooking,
  };

  return bookingWithUser;
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

async function findUserByUId(uId: string) {
  const user = await prisma.user.findFirst({ where: { uId } });

  logger.debug(`BS: User entry found: ` + JSON.stringify(user, null, 2));

  if (!user?.id) throw new Error(`No user found for uId ${uId}`);

  return user;
}

function createWhereStatementForName(name: string | undefined) {
  if (!name) return;

  const names = name.split(" ");
  const noSpace = {
    OR: [
      {
        firstName: {
          startsWith: names[0],
        },
      },
      {
        lastName: {
          startsWith: names[0],
        },
      },
    ],
  };

  const withSpace = {
    AND: [
      {
        firstName: {
          startsWith: names[0],
        },
      },
      {
        lastName: {
          startsWith: names[1],
        },
      },
    ],
  };

  return names.length > 1 ? withSpace : noSpace;
}
function createDateFromString(date: string | undefined) {
  return date ? new Date(date).toISOString() : undefined;
}

function createWhereStatementForCourse(input: string | undefined) {
  if (!input) return;

  const parts = input.split(" ");
  const isFirstPartInt = Number.isInteger(+parts[0]);

  const noSpace = isFirstPartInt
    ? {
        year: { equals: +parts[0] },
      }
    : {
        type: {
          shortName: {
            startsWith: parts[0],
          },
        },
      };

  const withSpace = {
    AND: [
      {
        type: {
          shortName: {
            startsWith: parts[0],
          },
        },
      },
      {
        year: { equals: +parts[1] },
      },
    ],
  };

  return parts.length > 1 ? withSpace : noSpace;
}
