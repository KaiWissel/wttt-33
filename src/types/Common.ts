import { z } from "zod";

export const IdParam = z.object({
  id: z.string(),
});

export type IdParamType = z.infer<typeof IdParam>;
