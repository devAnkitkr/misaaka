import React from 'react';
import Image from 'next/image';
import LoadingSpinner from './LoadingSpinner';

export const CartList = ({
  cart,
  removeItemHandler,
  isLoading,
  updateCartHandler,
}) => {
  return (
    <div className="w-full flex flex-col md:w-[60%] border rounded-lg p-2">
      <div className="w-full border-b pb-2 mb-4 text-heading">
        <h1>ITEM LIST</h1>
      </div>
      {cart.map((product) => (
        <div className="w-full flex relative py-2">
          {/* ==============================item image================================================== */}
          <div className="w-[100px] h-auto">
            <Image
              src={product.images[0]}
              alt={product.name}
              width="40"
              height="50"
              layout="responsive"
              className="max-w-full h-full object-cover cursor-pointer"
              onClick={() => router.push(`/products/${product.slug}`)}
            />{' '}
          </div>
          {/* ============================item details============================================= */}
          <div className="flex flex-col p-2 ml-3">
            <h1
              className="font-semibold text-heading mb-2 cursor-pointer hover:underline"
              onClick={() => router.push(`/products/${product.slug}`)}
            >
              {product.name}
            </h1>
            <select
              className="mb-2 w-fit p-1 bg-gray-100 text-caption rounded outline-none cursor-pointer"
              onChange={(e) => updateCartHandler(product, e.target.value)}
            >
              {[...Array(product.countInStock).keys()].map((x) => (
                <option value={x + 1} key={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <p className="text-active flex">
              ₹{' '}
              {isLoading ? (
                <LoadingSpinner className="fill-teal-400" />
              ) : (
                product.price * product.quantity
              )}
            </p>
          </div>
          {/* ====================================remove item============================================= */}
          <div
            className="absolute right-2 top-2 w-[22px] flex justify-center items-center text-white h-[22px] rounded-full bg-gray-400 hover:bg-gray-900 cursor-pointer"
            onClick={() => removeItemHandler(product)}
          >
            x
          </div>
        </div>
      ))}
    </div>
  );
};
