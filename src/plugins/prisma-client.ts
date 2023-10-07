import { PrismaClient } from "@prisma/client";
import logger from "../logger";

let prisma: PrismaClient | null = null;

let connectionUnchecked = true;

async function init() {
  try {
    prisma = new PrismaClient();
    logger.info("PC: Try to connect to database");
    await prisma.$connect();
    logger.info("PC: Connected to database");
  } catch (error) {
    logger.error(
      "PC: Could not connect to database " + JSON.stringify(error, null, 2)
    );
  }
}

if (connectionUnchecked) {
  connectionUnchecked = false;
  await init();
}

export default prisma as unknown as PrismaClient;
