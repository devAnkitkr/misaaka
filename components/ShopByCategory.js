import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { SvgIcons } from '../utils/svgIcons';

export default function ShopByCategory(props) {
  const router = useRouter();
  const { categories } = props;
  return (
    <div className="w-full my-10">
      <div className="px-4 mb-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-heading">Shop by category</h1>
        <div
          className="text-caption flex items-center cursor-pointer hover:underline"
          onClick={() => router.push('/shop')}
        >
          <span>Browse all categories </span>
          <span className="fill-teal-500">{SvgIcons.arrowIcon}</span>
        </div>
      </div>
      <div className="flex flex-col items-center md:flex-row md:justify-between mx-4 md:mx-0">
        {categories.map((category, index) => (
          <div
            className="w-full h-[200px] md:h-[350px] my-4 mx-4 relative overflow-hidden rounded-lg group"
            onClick={() => router.push(`/shop/${category.slug}`)}
            key={index}
          >
            <Image
              src={category.image}
              alt={category.name}
              layout="fill"
              objectFit="cover"
            />
            <div className="transition-all  text-dark  capitalize  ease-in duration-300 absolute top-0 left-0 w-full h-full bg-gradient-to-t from-neutral-900/50 to-neutral-900/10 hover:bg-neutral-900/50 p-4 flex text-2xl font-light justify-center text-white cursor-pointer">
              <p className="absolute group-hover:bottom-[40%] md:group-hover:bottom-[45%] bottom-[15%] transition-all ease-in duration-150">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
