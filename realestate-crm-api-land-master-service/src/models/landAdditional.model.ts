import mongoose, { Schema, Document } from "mongoose";
import Land from  "../models/land.model.js"
interface LandAdditional extends Document {
  landId: Schema.Types.ObjectId
  operationalInfo: {
    utilities: {
      water: { type: boolean };
      gas: { type: boolean };
      electricity: { type: boolean };
      recycling: { type: boolean };
      internet: { type: boolean };
      sewer: { type: boolean };
    };
    maintenanceAndRepairs: { type: boolean };
    maintenanceFile: string[];
    currentOccupancyStatus: { type: string };
    attachTenancyAgreement: string[];
  };

  additionalInfo: {
    pastOwner: { type: string };
    phoneNumber: { type: string };
    envirAssessments: string[];
    insurancePolicies: string[];
  };
}

// Define Mongoose schema for Land
const landAdditionalSchema: Schema<LandAdditional> = new Schema(
  {
    landId: {type: Schema.Types.ObjectId, ref: Land },
    operationalInfo: {
      utilities: {
        water: { type: Boolean, default: false },
        gas: { type: Boolean, default: false },
        electricity: { type: Boolean, default: false },
        recycling: { type: Boolean, default: false },
        internet: { type: Boolean, default: false },
        sewer: { type: Boolean, default: false },
      },
      maintenanceAndRepairs: { type: Boolean, default: false },
      maintenanceFile:  [{ type:String, required:false }],  
      currentOccupancyStatus: { type: String },
      attachTenancyAgreement:  [{ type:String, required:false }],
    },
    additionalInfo: {
      pastOwner: { type: String, required: false },
      phoneNumber: { type: String, required: false },
      attachTenancyAgreement: [{ type: String }],
      envirAssessments:  [{ type:String, required:false }],
      insurancePolicies: [{ type:String, required:false }],
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<LandAdditional>(
  "LandAdditional",
  landAdditionalSchema
);
