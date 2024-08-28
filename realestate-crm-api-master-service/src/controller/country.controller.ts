import { Request, response, Response } from "express";
import { country } from "../models/country.model.js";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";

export async function getCountriesHandler(req:Request,res:Response){
    try {
       const countries = await country.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);

       const result = countries.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))

       return res.status(200).json({data:result})

    } catch (error:any) {
        throw new error(error)
    }
}

