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
  console.log("CS: Will create new course");
  const newCourse = await prisma.course.create({
    data: { year: data.year, courseTypeShortName: data.shortName },
  });
  console.log("CS: New course created");

  return newCourse;
}

export async function updateCourse(id: string, data: CourseRequestType) {
  console.log("CS: Will update course");
  const newCourse = await prisma.course.update({
    where: { id },
    data: { courseTypeShortName: data.shortName, year: data.year },
  });
  console.log("CS: Course updated");

  return newCourse;
}

export async function deleteCourse(id: string) {
  console.log("CS: Will try to delete course");

  const res = await prisma.course.delete({
    where: {
      id,
    },
  });
  console.log("CS: Course deleted");

  return res;
}
