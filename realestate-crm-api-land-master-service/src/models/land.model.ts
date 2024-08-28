import { name } from "aws-sdk/clients/importexport.js";
import mongoose, { Schema, Document, Types } from "mongoose";

// Define interface for Land document
interface Land extends Document {
  // userId: { type: Types.ObjectId; ref: "users" };
  userId: number;
  identifyingInformation: {
    propertyID: string;
    propertyName: string;
    propertyType: [
      {
        value: string;
        label: string;
      }
    ];
  };
  locationDetails: {
    fullAddress: string;
    state: [
      {
        _id: number;
        name: string;
      }
    ];
    city: [
      {
        _id: number;
        name: string;
      }
    ];
    zipCode: number;
    longitude: string;
    latitude: string;
    otherRequirements: string;
  };

  legalInformation: {
    ownerName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    legalDescription: string;
    zoningInformation: string;
    attachFiles: string[];
  };

  physicalChar: {
    lotSize: string;
    // lotSize: {
    //   value: string;
    //   unit: string;
    // };
    buildingSize: string;
    noOfUnit: string;
    constructYear: string;
  };

  financialInfo: {
    purchasePrice: number;
    marketValue: number;
    taxInfo: number;
    rentalIncome: number;
  };

  isActive: boolean;
  isDelete: boolean;
  deleteAt: Date;
}

// Define Mongoose schema for Land
const landSchema: Schema<Land> = new Schema(
  {
    // userId: { type: Types.ObjectId, ref: "users" },
    userId: { type: Number, required: false },

    identifyingInformation:{
       propertyID: { type: String, required: false },
        propertyName: { type: String, required: false },
        propertyType: [
          {
            value: { type: String, required: false },
            label: { type: String, required: false },
          },
        ],    
    },

    locationDetails: {
      fullAddress: { type: String, required: false },
      state: {
        _id: { type: Number, required: false },
        name: { type: String, required: false },
      },
      city: {
        _id: { type: Number, required: false },
        name: { type: String, required: false },
      },
      zipCode: { type: Number, required: false },
      longitude: { type: String, required: false },
      latitude: { type: String, required: false },
      otherRequirements: { type: String, required: false },
    },

    legalInformation: {
      ownerName: { type: String, required: false },
      email: { type: String, required: false },
      // countryCode: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      legalDescription: { type: String, required: false },
      zoningInformation: { type: String, required: false },
      // attachFiles: [{ type: String, required: false }],
    },

    physicalChar: {
      lotSize: { type: String, required: false },
      // lotSize: {
      //   value: { type: String, required: false },
      //   unit: { type: String, required: false },
      // },
      buildingSize: { type: String, required: false },
      noOfUnit: { type: String, required: false },
      constructYear: { type: String, required: false },
    },

    financialInfo: {
      purchasePrice: { type: Number, required: false },
      marketValue: { type: Number, required: false },
      taxInfo: { type: Number, required: false },
      rentalIncome: { type: Number, required: false },
    },

    isActive: { type: Boolean, require: false, default: false },
    isDelete: { type: Boolean, require: false, default: false },
    deleteAt: { type: Date, required: false },
  },
  { timestamps: false, versionKey: false }
);

export default mongoose.model<Land>("Land", landSchema);
