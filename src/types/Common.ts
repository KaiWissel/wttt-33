import { z } from "zod";

export const DeleteRequest = z.object({
  id: z.string(),
});

export type DeleteRequestType = z.infer<typeof DeleteRequest>;
