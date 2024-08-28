import { z } from "zod";

// Custom error messages
const customErrorMessages = {
  phoneNumber: "Invalid phone number format",
};

// Regex patterns
const phoneNumberRegex = /^\d{10}$/;

// Schema for operational info
const utilitiesSchema = z.object({
  water: z.boolean().optional(),
  gas: z.boolean().optional(),
  electricity: z.boolean().optional(),
  recycling: z.boolean().optional(),
  internet: z.boolean().optional(),
  sewer: z.boolean().optional(),
});

const operationalInfoSchema = z
.object({
  utilities: utilitiesSchema.optional(),
  maintenanceAndRepairs: z.boolean().optional(),
  maintenanceFile: z.array(z.string()).optional(),  // Updated to array of strings
  currentOccupancyStatus: z.string().optional(),
  attachTenancyAgreement: z.array(z.string()).optional(), // Updated to array of strings
})
.partial();

// Schema for additional info
const additionalInfoSchema = z
.object({
  pastOwner: z.string().optional(),
  phoneNumber: z
  .string(),
    // .regex(phoneNumberRegex, { message: customErrorMessages.phoneNumber })
    // .optional(),
  envirAssessments: z.array(z.string()).optional(), // Updated to array of strings
  insurancePolicies: z.array(z.string()).optional(), // Updated to array of strings
})
.partial();

// Full schema combining all parts
export const landAdditionalValidation = z
.object({
  body: z.object({
    operationalInfo: operationalInfoSchema,
    additionalInfo: additionalInfoSchema,
  })
  .partial(), // Make the whole body object partial to reflect optional fields
});

