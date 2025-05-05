import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  name: { type: String, required: true },
  gst_number: { type: String },
  ure_number: { type: String },
  isGstRegistered: { type: Boolean },
  isGenerated: { type: Boolean },
  address: { type: String },
  state: { type: String },
  payment_mode: { type: String },
  paid_amount: { type: Number },
  products: [
    {
      product_name: { type: String, lowercase: true, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      hsn_code: { type: String },
    },
  ],
  invoice_number: { type: Number },
  date: { type: Date, default: Date.now },
  show_invoice: { type: Boolean, default: true },
});

billingSchema.path("invoice_number").default(() => {
  return Math.floor(1000 + Math.random() * 9000);
});
// Model
const BillingModel = mongoose.model("billing", billingSchema);

export default BillingModel;
