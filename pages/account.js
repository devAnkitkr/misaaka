import React, { useState, useEffect, useContext } from 'react';
import Orders from '../components/Orders';
import Profile from '../components/Profile';
import { ShopContext } from '../utils/shopContext';
import { useRouter } from 'next/router';

const style = {
  listStyle:
    'flex justify-between pl-2 items-center border-b border-r border-l hover:text-active cursor-pointer',
};

export default function Account() {
  const [page, setPage] = useState(1);
  const { state, dispatch } = useContext(ShopContext);
  const router = useRouter();

  useEffect(() => {
    state.user == null && router.push('/');
  }, []);

  const pageSetter = () => {
    if (page == 1) {
      return <Profile />;
    } else return <Orders />;
  };

  const handleLogOut = () => {
    setPage(3);
    dispatch({ type: 'LOG OUT', payload: state.user });
    router.push('/');
  };
  return (
    <div className="w-full flex flex-col md:flex-row px-4 mt-10">
      <div className="w-full md:w-[50%] border-t md:mr-2 rounded-lg overflow-hidden">
        <div className="w-full">
          <ul className="w-full h-max flex flex-col">
            <li className={style.listStyle} onClick={() => setPage(1)}>
              <span className="p-2">My Profile</span>
              {page == 1 && (
                <span className="w-2 py-5 h-max bg-rose-300"></span>
              )}
            </li>
            <li className={style.listStyle} onClick={() => setPage(2)}>
              <span className="p-2">My Orders</span>
              {page == 2 && (
                <span className="w-2 py-5 h-max bg-rose-300"></span>
              )}
            </li>
            <li className={style.listStyle} onClick={handleLogOut}>
              <span className="p-2">Logout</span>
              {page == 3 && (
                <span className="w-2 py-5 h-max bg-rose-300"></span>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full border rounded-lg overflow-hidden mt-4 md:mt-0">
        {pageSetter()}
      </div>
    </div>
  );
}
