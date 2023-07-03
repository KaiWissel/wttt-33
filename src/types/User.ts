import type { User } from ".prisma/client";
import { z } from "zod";

export const UserRequest = z.object({
  // TODO: Can we extract skip & take into a common definition for pagination?
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
  name: z.coerce.number().optional(),
  uId: z.coerce.number().optional(),
  course: z.string().optional(),
});

export const UserAddEditRequest = z.object({
  firstName: z.string(),
  lastName: z.string(),
  uId: z.string().nullable(),
  courseId: z.string(),
  status: z.string(),
});

export type UserRequestType = z.infer<typeof UserRequest>;
export type UserAddEditType = z.infer<typeof UserAddEditRequest>;

export type UserResponse = (Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  course: {
    courseTypeShortName: string;
    year: number;
  } | null;
})[];
