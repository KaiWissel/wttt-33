import type { Booking } from ".prisma/client";
import { z } from "zod";

export const BookingRequest = z.object({
  skip: z.coerce.number(),
  take: z.coerce.number(),
  location: z.string().optional(),
  from: z.string().datetime().optional(),
  till: z.string().datetime().optional(),
  course: z.string().optional(),
});

export type BookingResponse = (Omit<Booking, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  user: {
    firstName: string;
    lastName: string;
    course: {
      courseTypeShortName: string;
      year: number;
    } | null;
  };
})[];
