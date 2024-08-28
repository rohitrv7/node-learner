import { Request } from "express";
import { headerValidation } from "../data/header.js";

//straight forword way to get to union
type Lang = Pick<
  typeof headerValidation,
  "accept-language"
>["accept-language"][number];

//long way to get to union type
type headers = keyof typeof headerValidation;
type MyExtract<T, U extends T> = Extract<T, U>;
type LangHeader = MyExtract<headers, "accept-language">;
type LangValues = (typeof headerValidation)[LangHeader][number];

type Test = (typeof headerValidation)[keyof typeof headerValidation];
const getLangLocale = (req: Request) => {
  const lang = req.headers["accept-language"] as Lang;
  return lang ?? "en";
};

export { getLangLocale };
