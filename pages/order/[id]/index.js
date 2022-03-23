import axios from 'axios';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../../../components/checkoutForm';
import { ShopContext } from '../../../utils/shopContext';
import moment from 'moment';

const stripePromise = loadStripe('pk_test_G2hdoRP8JHKHxcRlI1YssjIG00cWcnl9tS');

export default function OrderId() {
  const router = useRouter();
  const { state } = useContext(ShopContext);

  const [priceDetail, setPriceDetail] = useState({
    totalMRP: 0,
    convenienceFee: 0,
  });
  const [shippingAddress, setShippingAddress] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [orderId, setOrderId] = useState(false);
  const [orderStatus, setOrderStatus] = useState(false);
  const [orderCreatedAt, setOrderCreatedAt] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  //  fetching order from database and recalculating Total amount

  useEffect(() => {
    if (state.cart && state.cart.length == 0) {
      router.push('/');
      return;
    }
    async function fetchData() {
      if (router.query.id) {
        const response = await axios.get(`/api/order/${router.query.id}/get`);
        setShippingAddress({
          ...response.data.shippingAddress,
        });
        setOrderItems([...response.data.orderItems]);
        setOrderId(response.data.orderId);
        setOrderStatus(response.data.status.isPaid);
        setOrderCreatedAt(response.data.createdAt);
        console.log('1st useEffect:', response.data);
      }
    }
    fetchData();
  }, [router, router.query]);

  useEffect(() => {
    async function fetchDataTwo() {
      if (orderItems != null && orderStatus == false) {
        const { data } = await axios.post(
          `/api/create-payment-intent/${router.query.id}`,
          { orderItems },
          { header: { 'Content-Type': 'application/json' } }
        );
        console.log('2nd useEffect:', data.order);

        // await axios.post();
        setClientSecret(data.clientSecret);
        setPriceDetail({
          totalMRP: orderItems.reduce(
            (a, c) => a + c.product.price * c.quantity,
            0
          ),
          convenienceFee:
            orderItems.reduce((a, c) => a + c.product.price * c.quantity, 0) >
            700
              ? 0
              : 79,
        });
      }
    }
    fetchDataTwo();
  }, [orderItems]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="w-full flex px-4 mt-10">
      <div className="w-full flex flex-col md:flex-row">
        {/* =============================Shipping Info=============================== */}
        <div className="w-full border rounded p-4">
          <h1 className="border-b pb-2 mb-4 text-heading">
            ORDER ID: <span className="text-caption">{orderId} </span>
          </h1>

          {/* =============================Saved Address=============================== */}
          {shippingAddress != null && (
            <div className="flex flex-col my-5 rounded p-4 w-full bg-gray-100">
              <h2 className="text-heading text-sm mb-4 ">Saved Address</h2>
              <div className="flex flex-col text-caption  text-sm">
                <div className="font-semibold">{shippingAddress.name}</div>
                <div>{shippingAddress.email}</div>
                <div>{shippingAddress.mobile}</div>
                <div>
                  {shippingAddress.address},{shippingAddress.pinCode}
                </div>
                <div>
                  {shippingAddress.city},{shippingAddress.state},{' '}
                  {shippingAddress.country}
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col my-5 rounded p-4 w-full bg-gray-100">
            <h2 className="text-heading text-sm mb-4 ">Payment Status</h2>
            <div className="text-sm border rounded w-max px-2 bg-white">
              {orderStatus == true ? 'Paid' : 'To be Paid'}
            </div>
          </div>
        </div>

        <div className="w-full h-max md:w-6/12 border rounded p-2 mt-4 md:mt-0 md:ml-2">
          {/* =============================Deliver Estimates=============================== */}
          <h1 className="border-b pb-2 mb-4 text-heading">
            Delivery Estimates
          </h1>
          {orderItems &&
            orderItems != null &&
            orderItems.map((item, index) => (
              <div
                className="w-full flex items-center  mb-4 bg-gray-100"
                key={index}
              >
                <div className="w-[80px] p-2">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width="40"
                    height="50"
                    layout="responsive"
                    objectFit="cover"
                  />
                </div>

                <div className="flex flex-col ml-4 text-caption">
                  <div className="font-semibold">{item.product.name}</div>
                  <span className="text-sm">Estimate delivery by</span>
                  <span className="text-heading text-sm">
                    {orderCreatedAt != null
                      ? moment(orderCreatedAt).format('ll')
                      : 'Loading...'}
                  </span>
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
            <div className="flex justify-between my-4 font-semibold text-heading">
              <div>Total Amount</div>
              <div>₹ {priceDetail.totalMRP + priceDetail.convenienceFee}</div>
            </div>
            {orderStatus == false && clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm orderId={orderId} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
