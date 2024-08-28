import { app } from './app.js';
import { connectToDB } from './config/db.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 3000; // Fallback to 3000 if PORT is not defined

const server = app.listen(PORT, async () => {
  await connectToDB();
  logger.info(`Land Service listening on ${PORT}`);
});
