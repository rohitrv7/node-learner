import express, { NextFunction, Request, Response } from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { accessLogger, errorLogger } from './utils/logger.js';
import { validateHeader } from './middleware/headerValidation.js';
import { headerValidation } from './data/header.js';
import { expressAsyncHandler } from './utils/express-promise.js';
import { ZodError } from 'zod';
import { masterRouter } from './routers/route.js';
import cors from 'cors';

import swaggerUi from "swagger-ui-express"
import swaggerData from './docs/swagger.json' with { type: 'json' };

const app = express();

app.use(
    pinoHttp({
        logger:accessLogger
    })
)

// app config
app.use(express.json()) // support json contect types
app.use(helmet()); // protection res.header
app.use(ExpressMongoSanitize()) // protection against injection attack ( remove keys that have $ or . from body.query and params)
app.use(express.urlencoded({ extended: false })); // supports urlencoded content type
//validate headers
app.use(validateHeader(headerValidation))

app.use('/master/dropdown/',masterRouter)

app.use("/master" + "/swagger/", swaggerUi.serve,swaggerUi.setup(swaggerData));


//not found routes handler
app.use(
    "*",
    expressAsyncHandler(async (req: Request, res: Response) => {
      throw new Error("Not found url on the server");
    })
  );



// error handler
app.use((error:Error,req:Request,res:Response,next:NextFunction)=>{
    errorLogger.error(error,"URL not Found");
    if(error instanceof ZodError){
        const err = error.issues.map((item)=>{
            console.dir(item,{depth:12});
            return item;
        })

        return res.status(400).json({ message: (req as any).__("Not Found"), err });
    }
    return res.status(400).json({ message: (req as any).__("Not Found"), data: {} });
})

export {app}