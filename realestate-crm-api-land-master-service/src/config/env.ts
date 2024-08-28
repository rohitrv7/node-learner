import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

export const env = createEnv({
  server: {
    DB_URI: z.string().url(),
    PORT: z.coerce.number(),
    NODE_ENV: z.enum(["development", "production", "test"]),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    S3_BUCKET_NAME: z.string(),
  },
  runtimeEnv: process.env,
});

export const {
  DB_URI,
  PORT,
  NODE_ENV,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  S3_BUCKET_NAME,
} = env;
