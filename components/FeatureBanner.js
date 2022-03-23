import React from 'react';
import { SvgIcons } from '../utils/svgIcons';

export default function FeatureBanner() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-10">
      <div className="border rounded-lg w-full h-[150px] mx-4 my-4 flex justify-center items-center">
        <div className="p-4 fill-teal-400">{SvgIcons.shippingIcon}</div>
        <div className="flex flex-col">
          <h1 className="text-heading text-xl">Free Shipping</h1>
          <p className="text-caption">All orders over Rs. 299</p>
        </div>
      </div>
      <div className="border rounded-lg w-full h-[150px] mx-4 my-4 flex justify-center items-center">
        <div className="p-4 fill-teal-400">{SvgIcons.paymentIcon}</div>
        <div className="flex flex-col">
          <h1 className="text-heading text-xl">Secured Payment</h1>
          <p className="text-caption">Support 24/7</p>
        </div>
      </div>
      <div className="border rounded-lg w-full h-[150px] mx-4 my-4 flex justify-center items-center">
        <div className="p-4 fill-teal-400">{SvgIcons.returnIcon}</div>
        <div className="flex flex-col">
          <h1 className="text-heading text-xl">14-Day Return</h1>
          <p className="text-caption">Shop with confidence</p>
        </div>
      </div>
    </div>
  );
}
