import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let connectionUnchecked = true;

async function init() {
  try {
    console.log("PC: Try to connect to database");
    await prisma.$connect();
    console.log("PC: Connected to database");
  } catch (error) {
    console.error("PC: Could not connect to database", error);
  }
}

if (connectionUnchecked) {
  connectionUnchecked = false;
  init();
}

export default prisma;
