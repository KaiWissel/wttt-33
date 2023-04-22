import type { Course } from ".prisma/client";
import { z } from "zod";

export const CourseRequest = z.object({
  year: z.number(),
  shortName: z.string(),
});

export type CourseRequestType = z.infer<typeof CourseRequest>;

export type CourseResponse = (Omit<Course, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
})[];
