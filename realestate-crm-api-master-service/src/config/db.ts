import mongoose, { connect } from "mongoose";
import { env } from "./env.js";
import { accessLogger, errorLogger } from "../utils/logger.js";
const db = mongoose.connection;
async function connectToDB() {
  try {
    await connect(env.DB_URI);
    accessLogger.info(`Master Service db connection succesfull`);
  } catch (err) {
    console.log({ err });
    errorLogger.error(err);
    process.exit(1);
  }
}

export { connectToDB };
