import { Request ,Response } from "express";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";
import { buyingtimeLine } from "../models/buyingTimeLine.model.js";

export async function getBuyingtimeLineHandler(req:Request, res: Response){
    try {
        const buyingtimeline = await buyingtimeLine.find({...AvailFilter},{isActive:0,isDelete:0}).lean()
        const lang = getLangLocale(req);
        const result = buyingtimeline.map((value,i)=>({
         ...value,
         name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
     }))
        
        console.log(result);
     
        return res.status(200).json({data:result})
      
     } catch (error:any) {
         throw new error(error)
     }

}