import nc from 'next-connect';
import Order from '../../../../models/order';
import Product from '../../../../models/products';
import db from '../../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();

  const order = await Order.findById(req.query.id);
  const productList = await Promise.all(
    order.orderItems.map(async (item) => ({
      product: await Product.findById(item.product_id),
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
