import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../utils/shopContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(ShopContext);
  const { cart } = state;
  const [priceDetail, setPriceDetail] = useState({
    totalMRP: 0,
    convenienceFee: 0,
  });
  useEffect(() => {
    setPriceDetail({
      totalMRP: cart.reduce((a, c) => a + c.price * c.quantity, 0),
      convenienceFee:
        cart.reduce((a, c) => a + c.price * c.quantity, 0) > 700 ? 0 : 79,
    });
  }, [cart]);

  const updateCartHandler = async (product, quantity) => {
    console.log('i was called', product._id, quantity);
    const { data } = await axios.get(`/api/product/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const removeItemHandler = (product) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: product });
  };

  return (
    <div className="w-full flex px-4 mt-10">
      {/* ===========================cart item========================== */}
      {cart.length > 0 ? (
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full border rounded p-2">
            <div className="border-b pb-2 mb-4 text-heading">ITEM LIST</div>
            {cart &&
              cart.length > 0 &&
              cart.map((product) => (
                <div
                  className="flex relative mt-2 hover:bg-gray-50"
                  key={product.slug}
                >
                  <div className="w-[100px] h-auto">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      width="40"
                      height="50"
                      layout="responsive"
                      className="max-w-full h-full object-cover cursor-pointer"
                      onClick={() => router.push(`/products/${product.slug}`)}
                    />
                  </div>
                  <div className="flex flex-col p-2 ml-3">
                    <h1
                      className="font-semibold text-heading mb-2 cursor-pointer hover:underline"
                      onClick={() => router.push(`/products/${product.slug}`)}
                    >
                      {product.name}
                    </h1>
                    <select
                      className="mb-2 w-fit p-1 bg-gray-100 text-caption rounded outline-none cursor-pointer"
                      onChange={(e) =>
                        updateCartHandler(product, e.target.value)
                      }
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    <p className="text-active">
                      ₹ {product.price * product.quantity}
                    </p>
                  </div>
                  <div
                    className="absolute right-2 top-2 w-[22px] flex justify-center items-center text-white h-[22px] rounded-full bg-gray-400 hover:bg-gray-900 cursor-pointer"
                    onClick={() => removeItemHandler(product)}
                  >
                    x
                  </div>
                </div>
              ))}
          </div>

          {/* ========================== PRICE DETAILS/ ORDER SUMMARY========================== */}
          <div className="w-full h-max md:w-6/12 flex flex-col border rounded p-2 mt-4 md:mt-0 md:ml-2">
            <div className="mb-4 text-heading">
              <h1>PRICE DETAILS</h1>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-caption">
                <div>Total MRP</div>
                <div>₹{priceDetail.totalMRP}</div>
              </div>
              <div className="flex justify-between border-b pb-4 text-caption">
                <div>Convenience Fee</div>
                <div>₹{priceDetail.convenienceFee}</div>
              </div>
              <div className="flex justify-between mt-4 font-semibold text-heading">
                <div>Total Amount</div>
                <div>₹ {priceDetail.totalMRP + priceDetail.convenienceFee}</div>
              </div>
            </div>
            <div>
              <button
                className="w-full rounded bg-rose-400 px-10 py-2 my-2 mt-8 mb-4 text-white font-bold hover:bg-rose-500 transition-[bg-color] ease-in duration-150"
                onClick={() => router.push('/checkout')}
              >
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full mx-auto">
          <div className="flex border rounded-lg mx-auto p-10 text-caption text-lg">
            Cart is empty
            <Link href="/shop">
              <a className="text-active mx-2">Go shopping</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
