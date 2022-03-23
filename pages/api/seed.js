import nc from 'next-connect';
import Categories from '../../models/category';
import Products from '../../models/products';
import { data } from '../../utils/data';
import db from '../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await Categories.deleteMany();
  await Categories.insertMany(data.categories);
  await Products.deleteMany();
  await Products.insertMany(data.products);
  const products = await Products.find({});

  const newProducts = products.map((product) => {
    return {
      name: product.name,
      category: product.category,
      slug: product.slug,
    };
  });
  await db.disconnect();

  res.send(newProducts);
});

export default handler;
