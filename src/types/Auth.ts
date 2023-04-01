import { z } from "zod";

export const AuthRequest = z.object({
  role: z.string(),
  password: z.string(),
});

export type AuthRequestType = z.infer<typeof AuthRequest>;
