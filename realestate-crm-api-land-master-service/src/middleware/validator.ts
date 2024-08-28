import { NextFunction, query, Request, Response } from "express";
import { AnyZodObject } from "zod";

function validator(obj: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = obj.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      res.locals.body = result.body;
      res.locals.query = result.query;
      res.locals.params = result.params;
      next();
    } catch (err: any) {
      console.log(err,'')
      next(err);
    }
  };
}



export { validator };

