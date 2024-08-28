import { LoggerOptions, pino, transport } from "pino";
import dayjs from "dayjs";

const rootDir = process.cwd();

const loggerOptions: LoggerOptions = {
  level: process.env.PINO_LOG_LEVEL || "info",
  timestamp: () => `,"time":"${dayjs().format()}"`,
};

const accessTransport = transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${rootDir}/access.log` },
    },
  ],
});
const applicationTransport = transport({
  target: "pino-pretty",
  options: { colorize: true },
});
const errorTransport = transport({
  level: "error", 
  target: "pino/file",
  options: { destination: `${rootDir}/error.log` },
});

const accessLogger = pino(loggerOptions, accessTransport);

const errorLogger = pino(loggerOptions, errorTransport);

const applicationLogger = pino(loggerOptions, applicationTransport);

export { accessLogger, errorLogger, applicationLogger };
