import { Schema , model } from "mongoose";

const buyingTimeLineSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
})

const buyingtimeLine = model('buyingtimline', buyingTimeLineSchema);

export { buyingtimeLine }