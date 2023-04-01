import { PrismaClient } from "@prisma/client";
import type { AuthRequestType } from "../types/Auth";

const prisma = new PrismaClient();

export async function login({ role, password }: AuthRequestType) {
  return await prisma.authentication.findFirst({
    where: { role, password },
  });
}
