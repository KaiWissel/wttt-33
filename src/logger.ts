import pino from "pino";

// const transport = pino.transport({
//   targets: [
//     {
//       target: "pino/file",
//       options: { destination: `../app.log` },
//       level: process.env.PINO_LOG_LEVEL || "info",
//     },
//     {
//       target: "pino-pretty",
//       options: {},
//       level: process.env.PINO_LOG_LEVEL || "info",
//     },
//   ],
// });

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  formatters: {
    level(label, number) {
      return { level: label };
    },
  },
  base: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    target: "pino-pretty",
  },
});

export default logger;
