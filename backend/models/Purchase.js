import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  name: { type: String, lowercase: true },
  address: { type: String },
  state: { type: String },
  payment_mode: { type: String },
  date: { type: Date, default: Date.now },
});

// Model
const PurchaseModel = mongoose.model("purchase-detail", PurchaseSchema);

export default PurchaseModel;
