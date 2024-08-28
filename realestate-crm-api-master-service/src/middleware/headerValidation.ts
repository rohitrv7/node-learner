import { NextFunction, Request, Response } from "express";
import { headerValidation } from "../data/header.js";

function validateHeader(headers: typeof headerValidation) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const [headerName, headerValue] of Object.entries(headers)) {
      const actualValue: any = req.headers[headerName.toLocaleLowerCase()];

      if (!headerName) {
        return res.status(400).json({ error: `Missing ${headerName} header` });
      }

      const validValues = Array.isArray(headerValue)
        ? headerValue
        : [headerValue];

      if (!validValues.includes(actualValue)) {
        return res
          .status(400)
          .json({ error: `Invalid value for ${headerName} header` });
      }
    }
    next();
  };
}

export { validateHeader };
