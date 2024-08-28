import { Schema, model } from "mongoose";

const countrySchema = new Schema(
  {
    _id: { type: Number, required: true},
    name: {
      hi: { type: String, required: false },
      en: { type: String, required: false },
      ar:{type:String,required:false}
    },
    flagname:{type:String,required:false},
    isDelete: { type: Boolean, required: false },
    isActive: { type: Boolean, required: false },
  },
  {
    timestamps: true
  }
);

const country = model("countries", countrySchema);

export { country };
