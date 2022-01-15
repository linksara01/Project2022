import mongoose from "mongoose";

const ResaleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    orderId: {
      type: String,
      required: true,
      maxlength: 60,
    },
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
    tel: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number],
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default:0,
    },
    extraOption : {
      type: [
        {
          text: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Resale ||
  mongoose.model("Resale", ResaleSchema);
