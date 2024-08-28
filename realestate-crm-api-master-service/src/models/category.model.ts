import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{type:String,required:false},
    },
    icon:{type:String,required:false},
    isDelete: { type: Boolean, required: false },
    isActive: { type: Boolean, required: false },
  },
  {
    timestamps: true
  }
);

const category = model("categories", categorySchema);

export { category };