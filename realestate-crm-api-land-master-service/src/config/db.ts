import { connect } from "mongoose";
import { env } from "./env.js";
import { logger } from "../utils/logger.js";

async function connectToDB() {
  try {
    logger.info(`Land Service db connection attempt`);
    await connect(env.DB_URI);
    logger.info(`Land Service db connection successful`);

  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

export { connectToDB };
