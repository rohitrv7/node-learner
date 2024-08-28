import { Schema, model } from "mongoose";

const propertySubTypeSchema = new Schema(
  {
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{type:String,required:false}
    },
    isDelete: { type: Boolean, required: false },
    isActive: { type: Boolean, required: false },
  },
  {
    timestamps: true
  }
);

const PropertySubType = model("property_subtype", propertySubTypeSchema);

export { PropertySubType };
