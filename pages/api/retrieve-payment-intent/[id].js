import nc from 'next-connect';
import Stripe from 'stripe';

const handler = nc();

handler.get(async (req, res) => {
  const { id } = req.query;

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

  const paymentIntent = await stripe.paymentIntents.retrieve(id);

  res.send({ paymentIntent });
});

export default handler;
