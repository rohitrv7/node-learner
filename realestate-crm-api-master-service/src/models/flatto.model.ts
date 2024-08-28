import { Schema , model } from "mongoose";

const flattoSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
    icon: { type: String, required: false}
})

const flatto = model('numberof-block', flattoSchema)

export { flatto }