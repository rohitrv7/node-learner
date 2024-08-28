import { Schema , model } from "mongoose";

const plotSizeSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
})

const PlotSize = model('plot_size', plotSizeSchema);

export { PlotSize }