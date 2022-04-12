import React, { useContext } from 'react';
import Image from 'next/image';
import { ShopContext } from '../utils/shopContext';

export default function ProfileCard({ setisEditProfile }) {
  const {
    state: { user },
  } = useContext(ShopContext);

  return (
    <div className="w-max flex justify-center items-center bg-rose-100 p-6 mt-10 rounded">
      <div className="w-[60px] h-[60px] relative m-2 mr-4 bg-rose-100">
        <Image src="/static/account.png" layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col justify-start">
        <h2 className="">{user && user.name}</h2>
        <p className="mb-2">{user && user.email}</p>
        <button
          className="w-max text-sm bg-rose-500 text-white p-1 px-2 rounded"
          onClick={() => setisEditProfile(true)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
