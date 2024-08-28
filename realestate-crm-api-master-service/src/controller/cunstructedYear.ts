import { Request ,Response } from "express";
import { cunstructedYear } from "../models/cunstructed.model.js";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { log } from "console";

export async function getCunstructedYearHandler(req:Request, res: Response){
    try {
        const cunstructedyear = await cunstructedYear.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
        const lang = getLangLocale(req);
        const result = cunstructedyear.map((value,i)=>({
         ...value,
         name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
     }))
        
        console.log(result);
     
        return res.status(200).json({data:result})
      
     } catch (error:any) {
         throw new error(error)
     }

}