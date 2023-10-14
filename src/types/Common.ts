import { z } from "zod";

export const IdParam = z.object({
  id: z.string(),
});

export type IdParamType = z.infer<typeof IdParam>;

export const Pagination = z.object({
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export type PaginationType = z.infer<typeof Pagination>;
