// app.ts
import express, { Request, Response } from "express";
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import {pinoHttp} from "pino-http";
import { expressAsyncHandler } from "./utils/express-promise.js";
import { accessLogger, logger } from "./utils/logger.js";
// import { authRouter } from './routes/auth.route.js';
import {landRouter} from "./routes/land.route.js"
import cors from "cors";

const app = express();

// CORS Configuration
const corsOptions = {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(
  pinoHttp({
    logger: accessLogger,
  })
);

// app config
app.use(express.json()); // support json content type
app.use(helmet()); // protection res.header
app.use(ExpressMongoSanitize()); // protection against injection attack ( remove keys that have $ or . from body.query and params)

//Routes and error handlers
//routes mounted
app.use("/admin/land", landRouter);

// Not Found routes handler (error builder)
// star(*) wildcard route
app.use(
  "*",
  expressAsyncHandler(async (req: Request, res: Response) => {
    logger.error("Not Found"); // Log the error
    throw new Error("Not Found");
  })
);

export { app };
