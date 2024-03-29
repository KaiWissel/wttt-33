import type { Booking } from ".prisma/client";
import { z } from "zod";
import type { UserResponse } from "./User";
import { Pagination, type PaginationType } from "./Common";

export const BOOKING_ACTIONS = [
  "Kommen",
  "Gehen",
  "Pause Start",
  "Pause Ende",
] as const;

export const BookingRequest = z
  .object({
    location: z.string().optional(),
    name: z.string().optional(),
    from: z
      .string()
      .regex(/\d{4}-\d{2}-\d{2}/)
      .optional(),
    till: z
      .string()
      .regex(/\d{4}-\d{2}-\d{2}/)
      .optional(),
    course: z.string().optional(),
  })
  .merge(Pagination);

const addEditRequest = z.object({
  location: z.string().nonempty(),
  action: z.string().nonempty(),
  bookingTime: z.string().nonempty(),
});

addEditRequest.extend({ bookingTime: z.string().nonempty() });

export const BookingAddEditRequest = addEditRequest.extend({
  userId: z.string().nonempty(),
});

export const BookingTerminalRequest = addEditRequest
  .extend({
    uId: z.string().nonempty(),
  })
  .omit({ bookingTime: true });

export type BookingRequestType = z.infer<typeof BookingRequest>;
export type BookingAddEditType = z.infer<typeof BookingAddEditRequest>;
export type BookingTerminalType = z.infer<typeof BookingTerminalRequest>;

export type BookingFilterOption = Omit<
  BookingRequestType,
  keyof PaginationType
> & { userId: string };

export type BookingResponse = Omit<Booking, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
} & {
  user: UserResponse;
};
