import { z } from "zod";

// Custom error messages
const customErrorMessages = {
  mobile: "Invalid mobile number format",
  countryCode: "Invalid country code format",
  email: "Email should be valid.",
};

const mobileRegex = /^[+]?[0-9]{10,15}$/;;
const countryCodeRegex = /^\+\d{1,3}$/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Schema for property type

const propertyTypeSchema = z.array(
 z.object({
    value: z.string().optional(),
    label: z.string().optional(),
  })
);

// Schema for identifying information
const identifyingInformationSchema = z.object({
    propertyID: z.string(),
    propertyName: z.string().optional(),
    propertyType: propertyTypeSchema.optional(),
  }).partial();

// Schema for location details
const locationDetailsSchema = z.object({
    fullAddress: z.string().optional(),
    city: z.object({
        _id: z.number().optional(),
        name: z.string().optional(),
      }).optional(),
    state: z.object({
        _id: z.number().optional(),
        name: z.string().optional(),
      }).optional(),
    zipCode: z.number().optional(),
    longitude: z.string().optional(),
    latitude: z.string().optional(),
    otherRequirements: z.string().optional(),
  }).partial();

// Schema for legal information
const legalInformationSchema = z.object({
    ownerName: z.string().optional(),
    email: z.string()
      .regex(emailRegex, { message: customErrorMessages.email })
      .optional(),
    // countryCode: z.string()
    //   .regex(countryCodeRegex, { message: customErrorMessages.countryCode })
    //   .optional(),
    phoneNumber: z.string()
      // .regex(mobileRegex, { message: customErrorMessages.mobile })
      .optional(),
    legalDescription: z.string().optional(),
    zoningInformation: z.string().optional(),
    // attachFiles: z.array(z.object({
    //       _id: z.string().optional(),
    //       name: z.string().optional(),
    //     })).optional(),
  }).partial();

// Schema for lot size
const lotSizeSchema = z.object({
    value: z.number().positive().optional(),
    unit: z.string().optional(),
  }).partial();

// Schema for physical characteristics
const physicalCharSchema = z.object({
    lotSize: z.string().optional(),
    buildingSize: z.string().optional(),
    noOfUnit: z.string().optional(),
    constructYear: z.string().optional(),
  })
  .partial();

// Schema for financial information
const financialInfoSchema = z.object({
  purchasePrice: z.number().optional(),
  marketValue: z.number().optional(),
  taxInfo: z.number().optional(),
  rentalIncome: z.number().optional(),
}).partial();

// Full schema combining all parts
export const landValidation = z.object({
  body: z.object({
    id: z.string().optional(),
      userId: z.number().optional(),
      identifyingInformation: identifyingInformationSchema.optional(),
      locationDetails: locationDetailsSchema.optional(),
      legalInformation: legalInformationSchema.optional(),
      physicalChar: physicalCharSchema.optional(),
      financialInfo: financialInfoSchema.optional(),
      isActive: z.boolean().optional(),
      isDelete: z.boolean().optional(),
      deleteAt: z.date().optional(),
    }).partial(), // The whole body object is also partial
});
