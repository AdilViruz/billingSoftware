import mongoose from "mongoose";

const buildProductSchema = new mongoose.Schema({
    branch: { type: String, required: true },
    product_name: { type: String,lowercase: true,required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
   
    date:{type:Date,default:Date.now}
})

// Model
const BuildProductModel = mongoose.model("build_product", buildProductSchema)

export default BuildProductModel