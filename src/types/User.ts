import type { User } from ".prisma/client";
import { z } from "zod";

export const UserRequest = z.object({
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
  name: z.coerce.number().optional(),
  uId: z.coerce.number().optional(),
  course: z.string().optional(),
});

export type UserRequestType = z.infer<typeof UserRequest>;

export type UserResponse = (Omit<User, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  course: {
    courseTypeShortName: string;
    year: number;
  } | null;
})[];
