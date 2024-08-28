import { Request, Response, NextFunction } from "express";

type AsyncFunction = (...args: any[]) => Promise<any>;

const expressAsyncHandler = <T extends AsyncFunction>(fn: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};
export { expressAsyncHandler };
