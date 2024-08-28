import { Request, Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { Relation } from "../models/relation.model.js";


export async function getRelationHandler(req:Request,res:Response){
    try {
       const relations = await Relation.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);
       const results = relations.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))
    

       return res.status(200).json({data:results})

    } catch (error:any) {
        throw new error(error)
    }
}

