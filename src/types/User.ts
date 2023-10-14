import type { User } from ".prisma/client";
import { z } from "zod";
import { Pagination } from "./Common";

export const UserRequest = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    uId: z.string().optional(),
    courseType: z.string().optional(),
    year: z.coerce.number().optional(),
  })
  .merge(Pagination);

export const UserAddEditRequest = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  uId: z.string().nonempty().nullable(),
  courseId: z.string().nonempty(),
  status: z.string(),
});

export type UserRequestType = z.infer<typeof UserRequest>;
export type UserAddEditType = z.infer<typeof UserAddEditRequest>;

export type UserFilterOption = Omit<UserRequestType, "skip" | "take">;

export type UserResponse = Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  course: {
    courseTypeShortName: string;
    year: number;
  } | null;
};
