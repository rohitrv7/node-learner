import { Request, Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { bhkType } from "../models/bhkTypes.model.js";

export async function getBhkTypeHandler(req:Request,res:Response){
    try {
       const bhktypes = await bhkType.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);
       const result = bhktypes.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))

    return res.status(200).json({data:result})

    } catch (error:any) {
        throw new error(error)
    }
}

