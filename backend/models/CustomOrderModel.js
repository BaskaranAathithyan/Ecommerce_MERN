import mongoose from "mongoose";

const customOrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const CustomOrder = mongoose.model("CustomOrder", customOrderSchema);
export default CustomOrder;
