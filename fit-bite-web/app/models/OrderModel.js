import mongoose, { Schema } from "mongoose";
const orderSchema = new Schema(
  {
    deliveryStatus:{ type: String, required: true},
    chargeId: { type: String, required: true , unique: true},
    userId: { type: String, required: true},
    orderStatus: { type: String, required: true },
    amount: { type: Number, required: true},
    paymentMethod: { type: String, required: true },
    billingEmail: { type: String, required: true },
    cardBrand: { type: String},
    last4Digits: { type: Number},
    receipt_url: { type: String,required: true },
  },
  { timestamps: true }
);
mongoose.models = {};
const Order = mongoose.model.Order || mongoose.model("Order", orderSchema);
export default Order;
