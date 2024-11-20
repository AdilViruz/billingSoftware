import mongoose from "mongoose";

const quotationSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String },
  state: { type: String },
  payment_mode: { type: String },
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
const quotationModel = mongoose.model("quotation", quotationSchema);

export default quotationModel;
