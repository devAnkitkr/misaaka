import React from 'react';
import { SvgIcons } from '../utils/svgIcons';
import Link from 'next/link';

export default function CategoryBanner() {
  return (
    <div className="w-full p-4  my-20">
      <div className='h-[150px]  md:h-[350px]  bg-[url("/banners/banner4.png")] bg-no-repeat bg-cover rounded-lg flex items-center p-[8rem]'>
        <div className="text-dark text-4xl flex flex-col">
          <div>Explore</div>
          <div> Tea Cups</div>
          <Link href="/shop/cups">
            <a className="text-lg flex items-center mt-4 ml-1 hover:underline">
              SHOP NOW
              <span className="fill-teal-400 ml-1">{SvgIcons.shopNowIcon}</span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
