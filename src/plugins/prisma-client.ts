import { PrismaClient } from "@prisma/client";
import logger from "../logger";

let prisma: PrismaClient | null = null;

let connectionUnchecked = true;

const clientConfig = {
  log: [
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
};

if (process.env.LOG_LEVEL == "debug") {
  clientConfig.log.push({
    emit: "event",
    level: "query",
  });
}

async function init() {
  try {
    // @ts-ignore
    prisma = new PrismaClient(clientConfig);
    // @ts-ignore
    prisma.$on("query", (e: any) => {
      console.log("Query: " + e.query);
      console.log("Params: " + e.params);
      console.log("Duration: " + e.duration + "ms");
    });
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
