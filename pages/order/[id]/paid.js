import axios from 'axios';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ShopContext } from '../../../utils/shopContext';
import SnackBar from '../../../components/SnackBar';
import moment from 'moment';

export default function Paid() {
  const router = useRouter();
  const { dispatch } = useContext(ShopContext);
  const snackBarRef = useRef(null);
  const snackBarRefSuccess = useRef(null);
  const [orderInfo, setOrderInfo] = useState({
    orderId: '',
    orderItems: [],
    shippingAddress: null,
    status: {},
    createdAt: '',
  });
  const [priceDetail, setPriceDetail] = useState({
    totalMRP: 0,
    convenienceFee: 0,
  });
  const [paymentStatus, setPaymentStatus] = useState('Loading...');

  const { orderItems, shippingAddress, createdAt } = orderInfo;

  useEffect(() => {
    async function fetchData() {
      if (router.query.id) {
        const response = await axios.get(`/api/order/${router.query.id}/get`);
        setOrderInfo({
          orderId: response.data.orderId,
          orderItems: [...response.data.orderItems],
          shippingAddress: { ...response.data.shippingAddress },
          status: { ...response.data.status },
          createdAt: response.data.createdAt,
        });
        console.log('1st useEffect:', response.data);
      }
    }
    fetchData();
  }, [router.query.id]);

  useEffect(() => {
    const { orderId, orderItems, status } = orderInfo;

    setPriceDetail({
      totalMRP: orderItems.reduce(
        (a, c) => a + c.product.price * c.quantity,
        0
      ),
      convenienceFee:
        orderItems.reduce((a, c) => a + c.product.price * c.quantity, 0) > 700
          ? 0
          : 79,
    });

    async function fetchDataTwo() {
      if (status.paymentIntentId) {
        const { data } = await axios.get(
          `/api/retrieve-payment-intent/${orderInfo.status.paymentIntentId}`
        );

        if (data.paymentIntent.status == 'succeeded') {
          const response = await axios.post(`/api/order/${orderId}/post`, {
            isPaid: data.paymentIntent.status == 'succeeded' ? true : false,
            paidAmount: data.paymentIntent.amount / 100,
          });
          if (response.data.paidOrder.status.isPaid == true) {
            dispatch({ type: 'CART_CLEAR_ITEM' });
            setPaymentStatus('Paid');
            snackBarRefSuccess.current.show();
            return;
          } else {
            setPaymentStatus('Not Paid');
            snackBarRef.current.show();
          }
        }
      }
    }
    fetchDataTwo();
  }, [orderInfo]);

  return (
    <div className="w-full flex px-4 mt-10">
      <SnackBar
        ref={snackBarRef}
        message="Something went wrong.Try again later"
        type="ERROR"
      />
      <SnackBar
        ref={snackBarRefSuccess}
        message="Hurray! Order is Placed"
        type="SUCCESS"
      />
      <div className="w-full flex flex-col md:flex-row">
        {/* =============================Shipping Info=============================== */}
        <div className="w-full border rounded p-4">
          <h1 className="border-b pb-2 mb-4 text-heading">
            ORDER ID:{' '}
            <span className="text-caption">
              {orderInfo.orderId != '' && orderInfo.orderId}{' '}
            </span>
          </h1>

          {/* =============================Saved Address=============================== */}
          {shippingAddress != null ? (
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
          ) : (
            <div className="animate-pulse flex flex-col my-5 rounded p-4 w-full bg-gray-100">
              <h2 className="text-heading text-sm mb-4 ">Saved Address</h2>
              <div className="flex flex-col text-caption text-sm">
                Loading...
              </div>
            </div>
          )}
          <div className="flex flex-col my-5 rounded p-4 w-full bg-gray-100">
            <h2 className="text-heading text-sm mb-4 ">Payment Status</h2>
            <div className="text border rounded w-max px-2 py-1 bg-teal-400 text-white">
              {paymentStatus}
            </div>
          </div>
        </div>

        <div className="w-full h-max md:w-6/12 border rounded p-2 mt-4 md:mt-0 md:ml-2">
          {/* =============================Deliver Estimates=============================== */}
          <h1 className="border-b pb-2 mb-4 text-heading">
            Delivery Estimates
          </h1>
          {orderItems && orderItems.length != 0 ? (
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
                    {moment(createdAt).add(5, 'days').format('ll')}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center p-2 mb-4 bg-gray-100 text-caption">
              Loading...
            </div>
          )}

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
          </div>
        </div>
      </div>
    </div>
  );
}
