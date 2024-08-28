import { Request, response, Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { cummunictionType } from "../models/cummunictionType.model.js";

export async function getCummunictionHandler(req:Request,res:Response){
    try {
       const cummunictiontype = await cummunictionType.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);

       const result = cummunictiontype.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))

       return res.status(200).json({data:result})

    } catch (error:any) {
        throw new error(error)
    }
}

