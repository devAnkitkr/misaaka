import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { data } from '../../utils/data';
import { useRouter } from 'next/router';
import db from '../../utils/db';
import Product from '../../models/products';
import Categories from '../../models/category';

export default function Shop(props) {
  const { categories, products } = props;
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="w-full mt-10 p-2">
      <div className="w-full flex flex-col md:flex-row">
        {/* ====================================drop down category for mobile============================== */}
        <div className="w-full relative text-center md:hidden p-2 my-4">
          <div
            className="border rounded text-heading font-semibold p-2 hover:bg-gray-50 cursor-pointer"
            onClick={() => setIsClicked(!isClicked)}
          >
            Select Categories{' '}
            <span className="float-right"> {isClicked ? '-' : '+'}</span>
          </div>
          <ul
            className={`absolute px-2 left-0 z-50 bg-white block w-full ${
              isClicked ? 'block' : 'hidden'
            }`}
          >
            <Link href="/shop" passHref>
              <li
                className="cursor-pointer 1 py-2 text-active border border-t-none"
                onClick={() => setIsClicked(false)}
              >
                New
              </li>
            </Link>
            {categories.map((category) => (
              <Link
                href={`/shop/${category.slug}`}
                key={category.slug}
                passHref
              >
                <li
                  className="cursor-pointer py-2 text-caption border border-t-none hover:text-active hover:bg-gray-50"
                  onClick={() => setIsClicked(false)}
                >
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* ====================================category menu for pc========================================= */}
        <div className="w-4/12 hidden md:block p-2">
          <div className="border-b text-heading font-semibold pb-2">
            Categories
          </div>
          <ul>
            <Link href="/shop" passHref>
              <li className="cursor-pointer py-1 text-active">New</li>
            </Link>
            {categories.map((category) => (
              <Link
                href={`/shop/${category.slug}`}
                key={category.slug}
                passHref
              >
                <li className="cursor-pointer py-1 text-caption">
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              className="w-full p-2 mb-2 cursor-pointer transition-transform ease-in duration-150 hover:scale-105"
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
                  priority={true}
                />
              </div>
              <div className="text-center mt-2">
                <h1 className="text-caption">{product.name}</h1>
                <p className="text-active">??? {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  await db.connect();
  const fetchProducts = await Product.find({}).lean();
  const fetchCategories = await Categories.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: fetchProducts.map(db.convertDocToObj),
      categories: fetchCategories.map(db.convertDocToObj),
    },
    revalidate: 10,
  };
}
