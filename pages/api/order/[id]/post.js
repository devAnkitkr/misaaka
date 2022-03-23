import nc from 'next-connect';
import Order from '../../../../models/Order';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    {
      order.status = {
        isPaid: req.body.isPaid,
        paidAmount: req.body.paidAmount,
        isdelivered: false,
        deliveryStatus: 'Processing',
        paymentIntentId: order.status.paymentIntentId,
      };
    }
  }
  const paidOrder = await order.save();
  await db.disconnect();
  res.send({ paidOrder });
});

export default handler;
