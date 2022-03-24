import React, { useContext, useRef } from 'react';
import ProductGallery from '../../components/ProductGallery';
import db from '../../utils/db';
import Product from '../../models/products';
import Categories from '../../models/category';
import { ShopContext } from '../../utils/shopContext';
import { SvgIcons } from '../../utils/svgIcons';
import Link from 'next/link';
import SnackBar from '../../components/SnackBar';

export default function ProductPage(props) {
  const { product, categorySlug } = props;
  const { dispatch } = useContext(ShopContext);
  const snackBarRef = useRef(null);

  const addToCartHandler = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 } });
    snackBarRef.current.show();
  };

  return (
    <div className="flex flex-col p-4 w-full mt-10 pb-20  md:pb-20">
      <SnackBar ref={snackBarRef} message="Added to cart" type="SUCCESS" />
      <span className="mb-10 flex text-caption text-sm">
        <Link href="/">Home</Link>
        <span className="fill-teal-300">{SvgIcons.navArrowIcon}</span>
        <Link href="/shop">Shop</Link>
        <span className="fill-teal-300">{SvgIcons.navArrowIcon}</span>
        <Link href={`/shop/${categorySlug}`}>{product.category}</Link>
      </span>
      <div className="flex flex-col md:flex-row">
        <ProductGallery images={product.images} />
        <div className="md:w-9/12 mt-6 md:ml-6">
          <h1 className="font-semibold text-2xl mb-1 text-heading">
            {product.name}
          </h1>
          <p className="text-caption">
            MRP:
            <span className="text-xl ml-2 text-gray-900">
              <span className="text-active"> ₹{product.price}</span>
            </span>
          </p>
          <p className="mt-8 text-caption">{product.description}</p>
          <button
            className="rounded bg-rose-400 px-10 py-2 my-2 mt-8 text-white font-bold hover:bg-rose-500 transition-[bg-color] ease-in duration-150"
            onClick={addToCartHandler}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  await db.connect();
  const fetchProducts = await Product.find({}).lean();
  await db.disconnect();
  const fetchSlug = fetchProducts.map((fetchProduct) => ({
    params: { slug: fetchProduct.slug },
  }));
  return {
    paths: [...fetchSlug],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  await db.connect();
  const fetchProduct = await Product.findOne({ slug: params.slug }).lean();
  const fetchCategory = await Categories.findOne({
    name: fetchProduct.category,
  });

  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(fetchProduct),
      categorySlug: fetchCategory.slug,
    }, // will be passed to the page component as props
  };
}
