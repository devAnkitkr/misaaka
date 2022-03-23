import Head from 'next/head';
import CategoryBanner from '../components/CategoryBanner';
import CoverSlider from '../components/CoverSlider';
import FeatureBanner from '../components/FeatureBanner';
import ProductSlider from '../components/ProductSlider';
import ShopByCategory from '../components/ShopByCategory';
import Categories from '../models/category';
import Product from '../models/products';
import db from '../utils/db';

export default function Home(props) {
  const { products, categories } = props;

  return (
    <div>
      <Head>
        <title>Misaaka</title>
        <meta
          name="description"
          content="Indian artisanal products, Crockery | Stoneware | Ceramics | Decor"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="w-full">
          <CoverSlider />
          <ProductSlider products={products} />
          <ShopByCategory categories={categories} />
          <CategoryBanner />
          <FeatureBanner />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const fetchProducts = await Product.find({ isFeatured: true })
    .limit(6)
    .lean();
  const fetchCategories = await Categories.find({}).limit(3).lean();
  await db.disconnect();

  return {
    props: {
      products: fetchProducts.map(db.convertDocToObj),
      categories: fetchCategories.map(db.convertDocToObj),
    },
  };
}
