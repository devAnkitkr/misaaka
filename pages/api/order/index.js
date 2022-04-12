import nc from 'next-connect';
import Order from '../../../models/order';
import db from '../../../utils/db';
import isAuth from '../../../utils/isAuth';

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({ ...req.body, user: req.user._id });
  const order = await newOrder.save();
  await db.disconnect();
  res.status(201).send(order);
});

export default handler;
