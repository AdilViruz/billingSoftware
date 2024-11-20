import mongoose from "mongoose";

const BuyerSchema = new mongoose.Schema({
    branch: { type: String, required: true },
    name: { type: String,lowercase: true},
    gst_number: { type: String},
    address: { type: String},
    state: { type: String},
    payment_mode: { type: String},
    date:{type:Date,default:Date.now}
})

// Model
const BuyerModel = mongoose.model("buyer-detail", BuyerSchema)

export default BuyerModel