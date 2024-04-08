import { PrismaClient } from "@prisma/client";
import {
  authentication,
  bookings,
  courseTypes,
  courses,
  users,
} from "./json-data-loader.mjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.courseType.deleteMany({});
  await prisma.authentication.deleteMany({});

  const resCt = await prisma.courseType.createMany({
    data: courseTypes,
  });

  const resC = await prisma.course.createMany({
    data: courses,
  });

  const resU = await prisma.user.createMany({
    data: users,
  });

  const resB = await prisma.booking.createMany({
    data: bookings,
  });

  const resA = await prisma.authentication.createMany({
    data: authentication,
  });

  console.log({ resCt, resC, resU, resB, resA });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
