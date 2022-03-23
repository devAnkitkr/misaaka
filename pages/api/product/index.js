import nc from 'next-connect';
import Product from '../../../models/products';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  const idList = req.body;
  await db.connect();
  const product = await Promise.all(
    idList.map(async (id) => await Product.findById(id))
  );
  await db.disconnect();
  res.send({ product });
});

export default handler;
