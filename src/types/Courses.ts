import type { Course } from ".prisma/client";
import { z } from "zod";

export const CourseRequest = z.object({
  course: z.string().optional(),
});

export type CourseRequestType = z.infer<typeof CourseRequest>;

export type CourseResponse = (Omit<Course, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
})[];
