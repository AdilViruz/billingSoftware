import mongoose from "mongoose";

const soldProductSchema = new mongoose.Schema({
    branch: { type: String, required: true },
    product_name: { type: String,lowercase: true, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    date:{type:Date,default:Date.now}
})

// Model
const SoldProductModel = mongoose.model("sold_product", soldProductSchema)

export default SoldProductModel