import { Schema , model } from "mongoose";

const bhkSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
})

const bhk = model('bhk', bhkSchema);

export { bhk }