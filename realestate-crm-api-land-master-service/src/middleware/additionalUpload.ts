import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3Config.js";
import { env } from "../config/env.js";

// Define allowed file types
const allowedImageTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
const allowedFileTypes = ["application/pdf"];

// Combine allowed file types for both fields
const allowedTypes = [...allowedImageTypes, ...allowedFileTypes];
const upload = multer({
  storage: multerS3({
    s3: s3 as any,
    bucket: env.S3_BUCKET_NAME!,
    acl: "public-read",
    key: (req, file, cb) => {
      const fieldName = file.fieldname;
      const fileType =
        fieldName === "maintenanceFile"
          ? "maintenanceFiles"
          : fieldName === "tenancyAgreement"
          ? "tenancyAgreements"
          : fieldName === "envirAssessments"
          ? "envirAssessments"
          : "insurancePolicies";
      cb(null, `${fileType}/${Date.now().toString()}_${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    // Check if the file type is allowed for all fields
    if (allowedTypes.includes(file.mimetype)) {
      return cb(null, true);
    } else {
      return cb(new Error("Invalid file type") as any, false);
    }
  },
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

// Middleware for handling file uploads
export const uploadMiddleware = upload.fields([
  { name: "maintenanceFile", maxCount: 5 },
  { name: "tenancyAgreement", maxCount: 5 },
  { name: "envirAssessments", maxCount: 5 },
  { name: "insurancePolicies", maxCount: 5 },
]);
