import React from 'react';
import { SvgIcons } from '../utils/svgIcons';
import Link from 'next/link';

export default function CategoryBanner() {
  return (
    <div className="w-full p-4 my-20">
      <div className='h-[150px]  md:h-[350px]  bg-[url("/static/banner4.png")] bg-no-repeat bg-cover rounded-lg flex items-center justify-center md:justify-start p-[8rem]'>
        <div className="text-dark min-w-max text-3xl md:text-4xl flex flex-col justify-center items-start">
          <div className="">Explore</div>
          <p className="">Tea Cups</p>
          <Link href="/shop/cups">
            <a className="w-full text-sm md:text-lg flex flex-row items-center mt-4 ml-1 hover:underline">
              SHOP NOW
              <span className="fill-teal-400 ml-1">{SvgIcons.shopNowIcon}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
