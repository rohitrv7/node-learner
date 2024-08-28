import { Request, Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { PlotSize } from "../models/plot-size.model.js";

export async function getPlotSizeHandler(req:Request,res:Response){
    try {
       const plotsizes = await PlotSize.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
       const lang = getLangLocale(req);
       const results = plotsizes.map((value,i)=>({
        ...value,
        name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
    }))
    

       return res.status(200).json({data:results})

    } catch (error:any) {
        throw new error(error)
    }
}

