import logger from "../logger";
import prisma from "../plugins/prisma-client";
import type { CourseRequestType } from "../types/Courses";

export async function findCourses() {
  return await prisma.course.findMany({
    orderBy: [
      {
        courseTypeShortName: "asc",
      },
      {
        year: "desc",
      },
    ],
  });
}
export async function findCourseTypes() {
  return await prisma.courseType.findMany({
    orderBy: {
      shortName: "asc",
    },
  });
}

export async function createCourse(data: CourseRequestType) {
  logger.debug("CS: Will create new course");
  const newCourse = await prisma.course.create({
    data: { year: data.year, courseTypeShortName: data.shortName },
  });
  logger.debug("CS: New course created");

  return newCourse;
}

export async function updateCourse(id: string, data: CourseRequestType) {
  logger.debug("CS: Will update course");
  const newCourse = await prisma.course.update({
    where: { id },
    data: { courseTypeShortName: data.shortName, year: data.year },
  });
  logger.debug("CS: Course updated");

  return newCourse;
}

export async function deleteCourse(id: string) {
  logger.debug("CS: Will try to delete course");

  const res = await prisma.course.delete({
    where: {
      id,
    },
  });
  logger.debug("CS: Course deleted");

  return res;
}
