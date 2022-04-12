import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../utils/shopContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartList } from '../components/CartList';
import { CartAmount } from '../components/CartAmount';

export default function Cart() {
  const router = useRouter();
  const { state, dispatch } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const { user, cart } = state;
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
    setIsLoading(true);
    const { data } = await axios.get(`/api/product/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    setIsLoading(false);
  };

  const removeItemHandler = (product) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: product });
  };

  const handleCheckoutRequest = () => {
    setIsLoading(true);
    if (user == null) {
      router.push('/login?redirect=/cart');
    } else {
      router.push('/checkout');
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full my-10 px-4">
      {cart.length != 0 ? (
        <div className="w-full flex flex-col md:flex-row">
          <CartList
            cart={cart}
            removeItemHandler={removeItemHandler}
            isLoading={isLoading}
            updateCartHandler={updateCartHandler}
          />

          <CartAmount
            priceDetail={priceDetail}
            isLoading={isLoading}
            handleCheckoutRequest={handleCheckoutRequest}
          />
        </div>
      ) : (
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full flex flex-col border rounded-lg p-2">
            <div className="w-full border-b pb-2 mb-4 text-heading">
              Cart is empty
              <Link href="/shop">
                <a className="text-active mx-2">Go shopping</a>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
