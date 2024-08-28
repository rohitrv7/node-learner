import { Router } from "express";
import { expressAsyncHandler } from "../utils/express-promise.js";
import { getCountriesHandler } from "../controller/country.controller.js";
import { getCategoryHandler } from "../controller/category.controller.js";
import { getAmenifyHandler } from "../controller/amenify.controller.js";
import { getCunstructedYearHandler } from "../controller/cunstructedYear.js";
import { getPropertiesTypesHandler } from "../controller/Property-type.controller.js";
import { getPlotSizeHandler } from "../controller/plot-size.controller.js";
import { getOccupancyStatusHandler } from "../controller/occupancy-status.controller.js";
import { getFlatToHandler} from "../controller/flatto.controler.js";
import { getProjectStatusHandler } from "../controller/project-status.controller.js";
import { getClpStatusHandler } from "../controller/clpstatus.cuntroller.js";
import { getBlockNameHandler } from "../controller/blockname.controller.js";
import { getNumberofFloorHandler } from "../controller/numberof-floor.js";
import { getPropertysubTypeHandler } from "../controller/property-subtype.controller.js";
import { getCummunictionHandler } from "../controller/cummunictionType.controller.js";
import { getCommunictionStatusHandler } from "../controller/communictionStatus.controller.js";
import { getLeadTypesHandler } from "../controller/leadType.controller.js";
import { getSourceTypesHandler } from "../controller/source-type.controller.js";
import { getBhkHandler } from "../controller/bhk.controller.js";
import { getBhkTypeHandler } from "../controller/bhkTypes.controller.js";
import { getBankNameHandler } from "../controller/bankname.controller.js";
import { getBuyingtimeLineHandler } from "../controller/buyingTimeLine.controller.js";
import { getProjectNameHandler } from "../controller/project-name.controller.js";
import { getRelationHandler } from "../controller/relation.controller.js";

const masterRouter = Router();

// service check api

masterRouter.get('/check',async function(req,res){
    return res.status(200).json({message:"Working"});
})

masterRouter.get("/country",expressAsyncHandler(getCountriesHandler));
masterRouter.get('/category',expressAsyncHandler(getCategoryHandler))
masterRouter.get("/amenify",expressAsyncHandler(getAmenifyHandler))
masterRouter.get("/property-type", expressAsyncHandler(getPropertiesTypesHandler))
masterRouter.get("/property-subtype", expressAsyncHandler(getPropertysubTypeHandler))
masterRouter.get("/bhk", expressAsyncHandler(getBhkHandler))
masterRouter.get("/bhk-type", expressAsyncHandler(getBhkTypeHandler))
masterRouter.get("/occupancy-status", expressAsyncHandler(getOccupancyStatusHandler))
masterRouter.get("/cunstrution-year", expressAsyncHandler(getCunstructedYearHandler))
masterRouter.get("/plot-size", expressAsyncHandler(getPlotSizeHandler))
masterRouter.get("/flat-to", expressAsyncHandler(getFlatToHandler))
masterRouter.get("/project-status", expressAsyncHandler(getProjectStatusHandler))
masterRouter.get("/clp-status", expressAsyncHandler(getClpStatusHandler))
masterRouter.get("/block-name", expressAsyncHandler(getBlockNameHandler)) 
masterRouter.get("/numberof-floor", expressAsyncHandler(getNumberofFloorHandler))
masterRouter.get("/cummunction-type", expressAsyncHandler(getCummunictionHandler))
masterRouter.get("/cummunction-status", expressAsyncHandler(getCommunictionStatusHandler))
masterRouter.get("/lead-type", expressAsyncHandler(getLeadTypesHandler)) 
masterRouter.get("/source-type", expressAsyncHandler(getSourceTypesHandler)) 
masterRouter.get("/bank-name", expressAsyncHandler(getBankNameHandler)) 
masterRouter.get("/buying-timeline", expressAsyncHandler(getBuyingtimeLineHandler)) 
masterRouter.get("/project-name", expressAsyncHandler(getProjectNameHandler)) 
masterRouter.get("/relation", expressAsyncHandler(getRelationHandler)) 

export {masterRouter}   