import { Schema , model } from "mongoose";

const sourceTypeSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
})

const SourceTypes = model('source_type', sourceTypeSchema);

export { SourceTypes }