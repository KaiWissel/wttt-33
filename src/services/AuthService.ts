import prisma from "../plugins/prisma-client";
import type { AuthRequestType } from "../types/Auth";
import jwt from "jsonwebtoken";

const jwtPrivateKey = import.meta.env.WTTT_33_JWT_PRIVATE_KEY;
const jwtTime = import.meta.env.WTTT_33_JWT_TIME;

export async function login({ role, password }: AuthRequestType) {
  console.log("AS: Validate password for", role);
  const found = await prisma.authentication.findFirst({
    where: { role, password },
  });
  if (found) {
    console.log("AS: Found user", found.role);
    return jwt.sign({ role }, jwtPrivateKey, { expiresIn: `${jwtTime}m` });
  }
  return null;
}
