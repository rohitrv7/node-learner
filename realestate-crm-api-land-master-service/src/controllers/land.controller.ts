import { Request, Response } from "express";
import Land from "../models/land.model.js";
import LandAdditional from "../models/landAdditional.model.js";
import { getUpdateFields, LandAdditionalData, LandData } from "../services/land.service.js";
import xlsx from 'xlsx';
import multer from "multer";
import { uploadMultiple } from "../middleware/upload.js";
import { uploadMiddleware } from "../middleware/additionalUpload.js";

export const addLand = async (req: Request, res: Response) => {
  // Handle multiple file uploads
  uploadMultiple(req, res, async (err: any) => {
    if (err) {
      console.error('File upload error:', err);
      return res.status(err instanceof multer.MulterError ? 400 : 500)
                .json({ message: 'File upload failed', error: err.message });
    }

    try {
      const { id, userId, identifyingInformation, legalInformation } = res.locals.body;

      // Initialize an array to store property types
      const propertyArr: any[] = [];

      // Process propertyType if it exists
      if (Array.isArray(identifyingInformation?.propertyType)) {
        identifyingInformation?.propertyType.forEach((property: any) => {
          propertyArr.push(property);
        });
      }

      const updateFields = getUpdateFields(res.locals.body);

      // Handle files if they were uploaded
      if (req.files) {
        const fileUrls = (req.files as Express.MulterS3.File[]).map(file => file.location);
        updateFields['legalInformation.attachFiles'] = fileUrls; // Store all file URLs
      }

      if (!id || id === undefined) {
        const land = new Land({
          userId,
          identifyingInformation: {
            ...identifyingInformation,
            propertyType: propertyArr,
          },
          legalInformation: {
            ownerName: "string",
            email: "string",
            countryCode: "string",
            phoneNumber: "string",
            legalDescription: "string",
            zoningInformation: "string",
            attachFiles: "",
          },
          locationDetails: {
            fullAddress: "string",
            state: {
              _id: 121,
              name: "string",
            },
            city: {
              _id: 121,
              name: "string",
            },
            zipCode: 121,
            longitude: "string",
            latitude: "string",
            otherRequirements: "string",
          },
        });
        await land.save();
        res.status(200).json({
          success: true,
          message: "Land information saved and updated successfully",
          data: land,
        });
      } else {
        // Find or create land document
        const land = await Land.findByIdAndUpdate(
          id,
          {
            $setOnInsert: {},
            $set: updateFields,
          },
          { new: true, upsert: true } // Update or create
        );

        res.status(200).json({
          success: true,
          message: "Land information saved and updated successfully",
          data: land,
        });
      }
    } catch (error: any) {
      console.error("Error processing land information:", error);
      res
        .status(500)
        .json({
          message: "Error processing land information",
          error: error.message || error,
        });
    }
  });
};


export const addLandAdditional = async (req: Request, res: Response) => {
  try {
    const { operationalInfo, additionalInfo, landId } = res.locals.body;

    // Use multer middleware to handle file uploads
    uploadMiddleware(req, res, async (err: any) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ message: "File upload error", error: err.message });
      }

      try {
        // Safe type assertion for req.files
        const files = req.files as { [fieldname: string]: Express.MulterS3.File[] | undefined } | undefined;

        // Retrieve URLs of uploaded files
        const maintenanceFiles = files?.["maintenanceFile"] as Express.MulterS3.File[] | undefined;
        const maintenanceFileUrls = maintenanceFiles ? maintenanceFiles.map(file => file.location) : [];

        const tenancyFiles = files?.["tenancyAgreement"] as Express.MulterS3.File[] | undefined;
        const tenancyAgreementUrls = tenancyFiles ? tenancyFiles.map(file => file.location) : [];

        const envirAssessmentFiles = files?.["envirAssessments"] as Express.MulterS3.File[] | undefined;
        const envirAssessmentUrls = envirAssessmentFiles ? envirAssessmentFiles.map(file => file.location) : [];

        const insurancePolicyFiles = files?.["insurancePolicies"] as Express.MulterS3.File[] | undefined;
        const insurancePolicyUrls = insurancePolicyFiles ? insurancePolicyFiles.map(file => file.location) : [];

        // Find or create LandAdditional document
        const addAdditional = await LandAdditional.findOneAndUpdate(
          { landId: landId || null }, // If landId is not provided, create a new document
          {
            $set: {
              operationalInfo: {
                utilities: operationalInfo?.utilities || {},
                maintenanceAndRepairs: operationalInfo?.maintenanceAndRepairs || false,
                maintenanceFile: maintenanceFileUrls,
                currentOccupancyStatus: operationalInfo?.currentOccupancyStatus || "",
                attachTenancyAgreement: tenancyAgreementUrls,
              },
              additionalInfo: {
                pastOwner: additionalInfo?.pastOwner || "",
                phoneNumber: additionalInfo?.phoneNumber || "",
                envirAssessments: envirAssessmentUrls,
                insurancePolicies: insurancePolicyUrls,
              },
            },
          },
          { new: true, upsert: true } // Create if not exists, return new document
        );

        res.status(200).json({
          message: "Land additional information saved and updated successfully",
          data: addAdditional,
        });
      } catch (error: any) {
        console.error("Error processing additional land information:", error);
        res.status(500).json({
          message: "Error processing additional land information",
          error: error.message || "Unknown error occurred",
        });
      }
    });
  } catch (error: any) {
    console.error("Error details:", error);
    res.status(500).json({
      message: "Error processing additional land information",
      error: error.message || "Unknown error occurred",
    });
  }
};

export const getAllLands = async (req: Request, res: Response) => {
  try {
    const lands = await Land.find();

    res.status(200).json({
      message: "All land information retrieved successfully",
      data: lands,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving land information", error });
  }
};
const uploadedFiles = new Set<string>();

export const handleBulkUpload = async (req: Request, res: Response) => {
  if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded.",
    });
  }

  try {
    const files = req.files as Express.Multer.File[];
    const landDataList: LandData[] = [];
    const landAdditionalDataList: LandAdditionalData[] = [];
    const errorMessages: string[] = [];

    for (const file of files) {
      // Check if the file has already been uploaded
      if (uploadedFiles.has(file.originalname)) {
        errorMessages.push(
          `File "${file.originalname}" has already been uploaded.`
        );
        continue; // Skip this file
      }

      // Process CSV file
      if (file.mimetype === "text/csv") {
        const workbook = xlsx.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json<any>(sheet);

        // Transform data to match Land and LandAdditional schemas
        for (const item of data) {
          const landData: LandData = {
            userId: item.userId,
            identifyingInformation: {
              propertyID: item.propertyID,
              propertyName: item.propertyName,
              propertyType: item.propertyType,
            },
            locationDetails: {
              address: item.address,
              city: item.city,
              state: item.state,
              zipCode: item.zipCode,
              longitude: item.longitude,
              latitude: item.latitude,
              nearByArea: item.nearByArea,
            },
            legalInformation: {
              ownerName: item.ownerName,
              email: item.email,
              countryCode: item.countryCode,
              phoneNumber: item.phoneNumber,
              legalDescription: item.legalDescription,
              zoningInformation: item.zoningInformation,
            },
            physicalChar: {
              lotSize: item.lotSize,
              buildingSize: item.buildingSize,
              noOfUnit: item.noOfUnit,
              constructYear: item.constructYear,
            },
            financialInfo: {
              purchasePrice: item.purchasePrice,
              marketValue: item.marketValue,
              taxInfo: item.taxInfo,
              rentalIncome: item.rentalIncome,
            },
          };

          const landAdditionalData: LandAdditionalData = {
            landId: item.landId,
            operationalInfo: {
              // utilities: item.utilities || {},
              maintenanceAndRepairs: item.maintenanceAndRepairs || "",
              // attachFile: item.attachFile || "",
              currentOccupancyStatus: item.currentOccupancyStatus || "",
              // attachTenancyAgreement: item.attachTenancyAgreement || "",
            },
            additionalInfo: {
              pastOwner: item.pastOwner || "",
              phoneNumber: item.phoneNumber || "",
            },
          };

          landDataList.push(landData);
          landAdditionalDataList.push(landAdditionalData);
        }

        // Store the new file in the uploaded files set
        uploadedFiles.add(file.originalname);
      } else {
        errorMessages.push(`Unsupported file type for "${file.originalname}".`);
      }
    }

    // Return error messages if any
    if (errorMessages.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Errors occurred during file upload.",
          errors: errorMessages,
        });
    }

    // Insert data into Land collection
    if (landDataList.length > 0) {
      const landDocs = await Land.insertMany(landDataList);
      console.log("Land documents inserted:", landDocs);
    }

    // Insert data into LandAdditional collection
    if (landAdditionalDataList.length > 0) {
      const landAdditionalDocs = await LandAdditional.insertMany(
        landAdditionalDataList
      );
      console.log("LandAdditional documents inserted:", landAdditionalDocs);
    }

    res.status(200).json({
      success: true,
      message: "Files processed and data saved successfully.",
      data: {
        landDocuments: landDataList,
        landAdditionalDocuments: landAdditionalDataList,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing files.");
  }
};
