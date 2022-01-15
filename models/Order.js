import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    total: {
      type: Number,
      required: true,
    },
    tel: {
      type: Number,
    },
    status: {
      type: Number,
      default:0,
    },
    method: {
        type: Number,
        required: true,
    },
    title: {
      type: String,
  },
    product: { type:String}
  },
  { timestamps: true }
);

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema);
