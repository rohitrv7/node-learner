import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const env = createEnv({
  server: {
    DB_URI: z.string().url(),
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(["development", "production", "test"]),
  },
  runtimeEnv: process.env,
});

export const { DB_URI, PORT,NODE_ENV } = env;
