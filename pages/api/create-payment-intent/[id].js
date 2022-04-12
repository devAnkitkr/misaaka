import nc from 'next-connect';
import Stripe from 'stripe';
import Order from '../../../models/order';
import db from '../../../utils/db';
const handler = nc();

handler.post(async (req, res) => {
  const { orderItems } = req.body;
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const calculateOrderAmount = (orderItems) => {
    const totalMRP = orderItems.reduce(
      (a, c) => a + c.product.price * c.quantity,
      0
    );
    const convenienceFee =
      orderItems.reduce((a, c) => a + c.product.price * c.quantity, 0) > 700
        ? 0
        : 79;
    return (totalMRP + convenienceFee) * 100;
  };

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(orderItems),
    currency: 'inr',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {},
  });

  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.status.paymentIntentId = paymentIntent.id;
  }
  await order.save();

  await db.disconnect();
  res.send({
    clientSecret: paymentIntent.client_secret,
    status: paymentIntent.status,
    order,
  });
});

export default handler;
