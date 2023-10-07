import type { Booking } from ".prisma/client";
import { z } from "zod";
import type { UserResponse } from "./User";

export const BOOKING_ACTIONS = [
  "Kommen",
  "Gehen",
  "Pause Start",
  "Pause Ende",
] as const;

export const BookingRequest = z.object({
  skip: z.coerce.number(),
  take: z.coerce.number(),
  location: z.string().optional(),
  from: z.string().datetime().optional(),
  till: z.string().datetime().optional(),
  course: z.string().optional(),
});

export const BookingAddEditRequest = z.object({
  location: z.string().nonempty(),
  action: z.string().nonempty(),
  userId: z.string().nonempty(),
  bookingTime: z.string().nonempty(),
});

export type BookingRequestType = z.infer<typeof BookingRequest>;
export type BookingAddEditType = z.infer<typeof BookingAddEditRequest>;

export type BookingFilterOption = Omit<BookingRequestType, "skip" | "take">;

export type BookingResponse = Omit<Booking, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  user: UserResponse;
};
