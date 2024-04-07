import { PrismaClient } from "@prisma/client";
import users from "../test/data/users.json" assert { type: "json" };
import bookings from "../test/data/bookings.json" assert { type: "json" };
import courses from "../test/data/courses.json" assert { type: "json" };
import courseTypes from "../test/data/courseTypes.json" assert { type: "json" };
import authentssication from "../test/data/authentication.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  await prisma.booking.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.courseType.deleteMany({});
  await prisma.authentication.deleteMany({});

  const resCt = await prisma.courseType.crseateMany({
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

  console.log({ resCt, resC, resU, resB });
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
