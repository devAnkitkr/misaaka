import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import db from '../../utils/db';
import Product from '../../models/products';
import ErrorPage from 'next/error';
import Categories from '../../models/category';

export default function Category(props) {
  const router = useRouter();
  const { categories, products, params, errorCode } = props;
  if (props.errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }
  return (
    <div className="w-full mt-10 p-2">
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-4/12 hidden md:block p-2">
          <div className="border-b font-semibold pb-2">Categories</div>
          <ul>
            <Link href="/shop" passHref>
              <li className="cursor-pointer py-1 text-caption">New</li>
            </Link>
            {categories &&
              categories.length != 0 &&
              categories.map((category) => (
                <Link
                  href={`/shop/${category.slug}`}
                  key={category.slug}
                  passHref
                >
                  <li
                    className={`cursor-pointer py-1 ${
                      params.category == category.slug
                        ? 'text-active'
                        : 'text-caption'
                    }`}
                  >
                    {category.name}
                  </li>
                </Link>
              ))}
          </ul>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products &&
            products.length !== 0 &&
            products.map((product) => (
              <div
                className="w-full p-2 mb-2 cursor-pointer"
                onClick={() => router.push(`/products/${product.slug}`)}
                key={product.slug}
              >
                <div className="min-w-full">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width="400"
                    height="430"
                    layout="responsive"
                    objectFit="cover"
                    className="w-full h-auto"
                  />
                </div>
                <div className="text-center mt-2">
                  <h1 className="text-caption">{product.name}</h1>
                  <p className="text-active">₹ {product.price}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await db.connect();
    const fetchCategories = await Categories.find({}).lean();
    const fetchCategory = fetchCategories.find(
      (item) => item.slug == params.category
    );
    console.log('fetchCategory', fetchCategory.name);
    const fetchProducts = await Product.find({
      category: { $eq: fetchCategory.name },
    }).lean();

    await db.disconnect();
    return {
      props: {
        products: fetchProducts.map(db.convertDocToObj),
        categories: fetchCategories.map(db.convertDocToObj),
        params,
      }, // will be passed to the page component as props
    };
  } catch (error) {
    return {
      props: {
        errorCode: 404,
      },
    };
  }
}
