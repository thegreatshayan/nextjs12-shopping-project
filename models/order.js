import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  orderItems: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
    },
  ],

  shippingData: { type: Object, required: true },

  paymentMethod: { type: String, required: true },

  totalPrice: { type: Number, required: true },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
