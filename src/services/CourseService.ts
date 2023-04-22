import { PrismaClient } from "@prisma/client";
import type { NewCourseRequestType } from "../types/Courses";

const prisma = new PrismaClient();

export async function findCourses() {
  return await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createCourse(request: NewCourseRequestType) {
  let courseType = null;
  courseType = await prisma.courseType.findFirst({
    where: { shortName: request.shortName },
  });

  if (!courseType) {
    console.log(
      "CS: Course type didn't existed yet. Will create new type entry."
    );
    courseType = await prisma.courseType.create({
      data: { longName: "", shortName: request.shortName },
    });
    console.log("CS: Created new type entry.");
  }

  console.log("CS: Will create new course");
  const newCourse = await prisma.course.create({
    data: { year: request.year, courseTypeShortName: request.shortName },
  });
  console.log("CS: New course created");

  return newCourse;
}
