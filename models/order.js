import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [
      {
        product_id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    shippingAddress: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      mobile: { type: String, required: true },
      pinCode: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    status: {
      isPaid: { type: Boolean, default: false, required: true },
      isdelivered: { type: Boolean, default: false, required: true },
      paidAmount: { type: Number, required: true },
      paymentIntentId: { type: String },
      deliveryStatus: { type: String, default: 'Processing', required: true }, //processing, shipped, Out for delivery, Delivered, Not delivered, Returned
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
