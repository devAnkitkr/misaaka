import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext, useRef } from 'react';
import ShippingForm from '../components/ShippingForm';
import SnackBar from '../components/SnackBar';

import { ShopContext } from '../utils/shopContext';

export default function Checkout() {
  const router = useRouter();
  const { state } = useContext(ShopContext);
  const { cart, shippingAddress } = state;
  const snackBarRef = useRef(null);

  const [priceDetail, setPriceDetail] = useState({
    totalMRP: 0,
    convenienceFee: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  var today = new Date();
  var dd = String(today.getDate() + 5).padStart(2, '0');

  var monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var mm = monthNames[String(today.getMonth() + 1)];
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  today = dd + ' ' + mm + ', ' + yyyy;

  useEffect(() => {
    if (cart.length == 0) {
      router.push('/');
      return;
    }
    setPriceDetail({
      totalMRP: cart.reduce((a, c) => a + c.price * c.quantity, 0),
      convenienceFee:
        cart.reduce((a, c) => a + c.price * c.quantity, 0) > 700 ? 0 : 79,
    });
  }, [cart, router]);

  const confirmOrder = async () => {
    if (shippingAddress == null) {
      snackBarRef.current.show();
      return;
    }
    setIsLoading(true);
    const orderItems = cart.map((product) => ({
      product_id: product._id,
      quantity: product.quantity,
    }));
    const response = await axios.post('/api/order', {
      orderItems,
      shippingAddress,
      status: {
        isPaid: false,
        paidAmount: 0,
        isDelivered: false,
        deliveryStatus: 'Processing',
      },
    });
    setIsLoading(false);
    router.push(`/order/${response.data._id}`);
  };

  return (
    <div className="w-full flex px-4 mt-10">
      <SnackBar
        ref={snackBarRef}
        message="Shipping address is not provided"
        type="ERROR"
      />
      <div className="w-full flex flex-col md:flex-row">
        {/* =============================Shipping Info=============================== */}
        <div className="w-full border rounded p-4">
          <h1 className="border-b pb-2 mb-4 text-heading">Shipping Address</h1>

          {/* =============================Saved Address=============================== */}
          {state.shippingAddress != null && (
            <div className="flex my-5 border rounded p-2 w-max">
              <h2 className="text-caption text-sm">Saved Address:</h2>
              <div className="text-caption ml-2 text-sm">
                <div className="font-semibold">
                  {state.shippingAddress.name}
                </div>
                <div>{state.shippingAddress.email}</div>
                <div>{state.shippingAddress.mobile}</div>
                <div>
                  {state.shippingAddress.address},
                  {state.shippingAddress.pinCode}
                </div>
                <div>
                  {state.shippingAddress.city},{state.shippingAddress.state},{' '}
                  {state.shippingAddress.country}
                </div>
              </div>
            </div>
          )}

          <ShippingForm />
        </div>

        <div className="w-full h-max md:w-6/12 border rounded p-2 mt-4 md:mt-0 md:ml-2">
          {/* =============================Deliver Estimates=============================== */}
          <h1 className="border-b pb-2 mb-4 text-heading">
            Delivery Estimates
          </h1>
          {cart &&
            cart.length > 0 &&
            cart.map((product) => (
              <div
                className="w-full flex items-center pb-2 mb-4 border-b"
                key={product.slug}
              >
                <div className="w-[80px]">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width="40"
                    height="50"
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col ml-4 text-caption">
                  Estimate delivery by{' '}
                  <span className="text-heading">{today}</span>
                </div>
              </div>
            ))}

          {/* =============================Price details=============================== */}
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

            <button
              className="w-full rounded bg-rose-400 flex  justify-center px-10 py-2 my-4 text-white font-bold hover:bg-rose-500 disabled:bg-rose-400 transition-[bg-color] ease-in duration-150"
              onClick={confirmOrder}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="animate-spin fill-white mr-3"
                  >
                    <circle cx="12" cy="20" r="2"></circle>
                    <circle cx="12" cy="4" r="2"></circle>
                    <circle cx="6.343" cy="17.657" r="2"></circle>
                    <circle cx="17.657" cy="6.343" r="2"></circle>
                    <circle cx="4" cy="12" r="2.001"></circle>
                    <circle cx="20" cy="12" r="2"></circle>
                    <circle cx="6.343" cy="6.344" r="2"></circle>
                    <circle cx="17.657" cy="17.658" r="2"></circle>
                  </svg>{' '}
                  Loading...
                </span>
              ) : (
                'CONFIRM'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
