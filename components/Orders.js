import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../utils/shopContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import moment from 'moment';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const {
    state: { user },
    dispatch,
  } = useContext(ShopContext);

  const router = useRouter();

  useEffect(() => {
    if (user == null) {
      router.push('/');
    }
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`/api/user-orders`, {
          headers: { authorization: `Bearer ${user.token}` },
        });

        console.table('response', data);
        if (typeof data !== 'string') {
          setOrders(data);
        }
      } catch (err) {
        console.log('err', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="w-full min-h-[400px]">
      <h1 className="text-center my-6 bg-rose-300 text-white p-4 mt-0">
        Order History
      </h1>
      <div className="w-full flex flex-col justify-start items-center w-full p-2 md:p-4">
        <div className="w-full flex">
          <table className="w-full text-xs md:text-sm">
            <tr className="border">
              <th className="border text-center">Order ID</th>
              <th className="border text-center">Order Date</th>
              <th className="border text-center">Paid</th>
              <th className="border text-center">Status</th>
              <th className="border text-center">Action</th>
            </tr>
            {orders.map((order) => (
              <tr className="border">
                <td className="border text-center">{order._id}</td>
                <td className="border text-center">
                  {moment(order.updatedAt).format('ll')}
                </td>
                <td className="border text-center">
                  Rs {order.status.paidAmount}
                </td>
                <td className="border text-center">
                  {order.status.deliveryStatus}
                </td>
                <td className="border text-center">
                  <button
                    className="bg-rose-400 text-white text-sm p-1 px-2 m-3 rounded"
                    onClick={() => router.push(`/order/${order._id}/paid`)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}
