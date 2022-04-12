import nc from 'next-connect';
import Order from '../../models/order';
import db from '../../utils/db';
import isAuth from '../../utils/isAuth';

const handler = nc();

handler.use(isAuth);

export default handler.get(async (req, res) => {
  try {
    await db.connect();
    const orders = await Order.find({
      user: req.user._id,
      'status.isPaid': { $eq: true },
    });

    await db.disconnect();
    console.log('dafsadfasd', orders);

    if (!orders || orders.length == 0) {
      res.send('No orders yet!');
    } else {
      res.send(orders);
    }
  } catch (error) {
    console.log('error', error);
    res.send('something went wrong please try again later');
  }
});
