import { PrismaClient } from "@prisma/client";
import type { CourseRequestType } from "../types/Courses";

const prisma = new PrismaClient();

export async function findCourses(res: CourseRequestType) {
  return await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
