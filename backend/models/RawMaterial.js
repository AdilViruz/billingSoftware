import mongoose from "mongoose";

const rawMaterialSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  state: { type: String },
  payment_mode: { type: String },
  total_amount: { type: Number },
  paid_amount: { type: Number },
  products: [
    {
      product_name: { type: String, lowercase: true, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],
  date: { type: Date, default: Date.now },
});

// Model
const RawMaterialModel = mongoose.model("raw-material", rawMaterialSchema);

export default RawMaterialModel;
