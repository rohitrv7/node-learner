import { Schema , model } from "mongoose";

const occupancyStatusSchema = new Schema({
    _id: { type: Number, required: true},
    name: {
      en: { type: String, required: false },
      ar:{ type:String,required:false }
    },
    isActive: { type: Boolean, required: false },
    isDelete: { type: Boolean, required: false },
    icon: { type: String, required: false}
})

const OccupancyStatus = model('occupancy_status', occupancyStatusSchema)

export { OccupancyStatus }