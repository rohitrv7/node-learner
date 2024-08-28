import { Request ,Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { clpStatus } from "../models/clpStatus.models.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";

export async function getClpStatusHandler(req:Request, res: Response){
    try {
        const clpstatus = await clpStatus.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
        const lang = getLangLocale(req);
        const result = clpstatus.map((value,i)=>({
         ...value,
         name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
     }))
        
        console.log(result);
     
        return res.status(200).json({data:result})
      
     } catch (error:any) {
         throw new error(error)
     }

}