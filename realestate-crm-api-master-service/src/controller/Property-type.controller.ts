import { Request, response, Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { PropertyType } from "../models/property-type.model.js";

export async function getPropertiesTypesHandler(req:Request,res:Response){
    try {

        
       const PropertiesTypes = await PropertyType.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);
       const results = PropertiesTypes.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))
    

       return res.status(200).json({data:results})

    } catch (error:any) {
        throw new error(error)
    }
}

