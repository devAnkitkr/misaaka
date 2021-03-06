import nc from 'next-connect';
import Order from '../../../../models/order';
import Product from '../../../../models/products';
import db from '../../../../utils/db';
var mongoose = require('mongoose');

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  // console.log('req', order);

  const order = await Order.findById(req.query.id);

  const productList = await Promise.all(
    order.orderItems.map(async (item) => ({
      product: await Product.findById({
        _id: mongoose.Types.ObjectId(item.product_id),
      }),
      quantity: item.quantity,
    }))
  );
  await db.disconnect();

  res.status(201).send({
    orderItems: [...productList],
    shippingAddress: order.shippingAddress,
    orderId: order._id,
    status: order.status,
    createdAt: order.createdAt,
  });
});

export default handler;
