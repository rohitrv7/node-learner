import { LoggerOptions, destination, pino, transport } from "pino";
import dayjs from "dayjs";
import { NODE_ENV } from "../config/env.js";

const rootDir = process.cwd();

const loggerOptions: LoggerOptions = {
  level: process.env.PINO_LOG_LEVEL || "info",
  timestamp: () => `,"time":"${dayjs().format()}"`,
  base: { pid: false },
};

const accessTransport = transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: `${rootDir}/access.log` },
    },
  ],
});

const devTransport = transport({
  target: "pino-pretty",
  options: { colorize: true },
});
const prodTransport = transport({
  target: "pino/file",
  level: "warn",
  options: { destination: `${rootDir}/app.log` },
});

const accessLogger = pino(loggerOptions, accessTransport);

const applicationLogger = pino(
  loggerOptions,
  NODE_ENV === "development" ? devTransport : prodTransport
);

export { accessLogger, applicationLogger as logger };
