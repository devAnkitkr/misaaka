import React from 'react';
import { SvgIcons } from '../utils/svgIcons';

export default function FeatureBanner() {
  return (
    <div className="flex flex-row text-sm md:text-base mx-0 md:mx-4 justify-between items-center my-10 p-4 md:p-0">
      <div className="border rounded-lg w-[32%] h-[130px] md:h-[150px] flex flex-col md:flex-row justify-center items-center bg-white drop-shadow">
        <div className="p-1 md:p-4 fill-teal-400">{SvgIcons.shippingIcon}</div>
        <div className="px-1 flex flex-col justify-center items-center text-center md:items-start">
          <h1 className="text-heading text-base md:text-xl">Free Shipping</h1>
          <p className="text-caption">Orders over Rs. 299</p>
        </div>
      </div>
      <div className="border rounded-lg w-[32%] h-[130px]  md:h-[150px] flex flex-col md:flex-row justify-center items-center bg-white drop-shadow">
        <div className="p-1 md:p-4 fill-teal-400">{SvgIcons.paymentIcon}</div>
        <div className="px-1 flex flex-col justify-center items-center text-center md:items-start">
          <h1 className="text-heading text-base md:text-xl">Secured Payment</h1>
          <p className="text-caption">Support 24/7</p>
        </div>
      </div>
      <div className="border rounded-lg w-[32%] h-[130px] md:h-[150px] flex flex-col md:flex-row justify-center items-center bg-white drop-shadow">
        <div className="p-1 md:p-4 fill-teal-400">{SvgIcons.returnIcon}</div>
        <div className="px-1 flex flex-col justify-center items-center text-center md:items-start">
          <h1 className="text-heading text-base md:text-xl">14-Day Return</h1>
          <p className="text-caption">Shop with confidence</p>
        </div>
      </div>
    </div>
  );
}
