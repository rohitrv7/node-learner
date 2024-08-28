import multer from 'multer';
import multerS3 from 'multer-s3';
import s3 from "../config/s3Config.js";
import { env } from '../config/env.js';

// Define allowed file types
const allowedImageTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
const allowedFileTypes = ['application/pdf'];

// Create the multer instance
const upload = multer({
  storage: multerS3({
    s3: s3 as any,
    bucket: env.S3_BUCKET_NAME!,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, `legalInformation/${Date.now().toString()}_${file.originalname}`);
    },
  }),
  // Validate file types
  fileFilter: (req, file, cb) => {
    // Check if file is an image or a PDF
    if (
      (file.mimetype && allowedImageTypes.includes(file.mimetype)) ||
      (file.mimetype && allowedFileTypes.includes(file.mimetype))
    ) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type') as any, false);
    }
  },
  // Enforce file size limit and maximum number of files
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

// Middleware to handle multiple files
export const uploadMultiple = upload.array('attachFiles', 5);


export default upload;
