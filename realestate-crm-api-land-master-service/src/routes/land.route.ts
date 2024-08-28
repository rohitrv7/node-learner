import { Router } from "express";
import { addLand, addLandAdditional, getAllLands, handleBulkUpload } from "../controllers/land.controller.js";
import { validator } from "../middleware/validator.js";
import { landValidation } from "../validations/land.validation.js";
import { landAdditionalValidation } from "../validations/land.additional.validations.js";
import { upload } from "../utils/upload.js";
// import uploadFile from "../services/multerConfig.js";

const landRouter = Router();

landRouter.get("/check", async function (req, res) {
  return res.status(200).json({ message: "Working" });
});

landRouter.post("/add-land", validator(landValidation), addLand)
landRouter.post("/add-land-additional", validator(landAdditionalValidation), addLandAdditional)
landRouter.get("/get-all-land",  getAllLands)


landRouter.post('/upload', upload.array('files', 10), handleBulkUpload);

export { landRouter };
