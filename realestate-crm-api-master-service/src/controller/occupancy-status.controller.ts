import { Request, Response } from "express";
import { OccupancyStatus } from "../models/occupancy-status.model.js";
import { AvailFilter } from "../utils/baseFilter.js";
import { getLangLocale } from "../utils/getLangFromHeader.js";

export async function getOccupancyStatusHandler(req: Request, res: Response){
    try {
        const occupancystatus = await OccupancyStatus.find({...AvailFilter}, {isActive: 0, isDelete: 0}).lean()
        const lang = getLangLocale(req)
        const results = occupancystatus.map((value, i) => ({
            ...value,
            name: value.name && value.name[lang] ? value.name[lang] : value.name?.en
        }))
    
        return res.status(200).json({data: results})
    } catch (error: any) {
        throw error(error)
    }
}