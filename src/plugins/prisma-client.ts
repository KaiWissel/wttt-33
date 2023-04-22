import { PrismaClient } from "@prisma/client";

let prisma = null;

let connectionUnchecked = true;

async function init() {
  try {
    prisma = new PrismaClient();
    console.log("PC: Try to connect to database");
    await prisma.$connect();
    console.log("PC: Connected to database");
  } catch (error) {
    console.error("PC: Could not connect to database", error);
  }
}

if (connectionUnchecked) {
  connectionUnchecked = false;
  await init();
}

export default prisma;
