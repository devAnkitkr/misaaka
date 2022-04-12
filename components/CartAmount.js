import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export const CartAmount = ({
  priceDetail,
  isLoading,
  handleCheckoutRequest,
}) => {
  return (
    <div className="w-full h-max md:w-[40%] border rounded-lg p-2 mt-2 md:mt-0 md:ml-2">
      <div className="w-full border-b pb-2 mb-4 text-heading">
        <h1>PRICE DETAILS</h1>
      </div>
      <div>
        <div className="flex justify-between text-caption">
          <div>Total MRP</div>
          <div className="flex">
            ₹
            {isLoading ? (
              <LoadingSpinner className="fill-gray-400" />
            ) : (
              priceDetail.totalMRP
            )}
          </div>
        </div>
        <div className="flex justify-between border-b pb-4 text-caption">
          <div>Convenience Fee</div>
          <div>₹{priceDetail.convenienceFee}</div>
        </div>
        <div className="flex justify-between mt-4 font-semibold text-heading">
          <div>Total Amount</div>
          <div className="flex">
            ₹{' '}
            {isLoading ? (
              <LoadingSpinner className="fill-rose-400" />
            ) : (
              priceDetail.totalMRP + priceDetail.convenienceFee
            )}
          </div>
        </div>
        <div>
          <button
            className="w-full rounded bg-rose-400 px-10 py-2 my-2 mt-8 mb-4 text-white font-bold hover:bg-rose-500 transition-[bg-color] ease-in duration-150"
            onClick={handleCheckoutRequest}
          >
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};
