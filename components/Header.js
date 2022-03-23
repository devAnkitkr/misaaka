import React, { useState, useContext } from 'react';
import Link from 'next/link';
import { ShopContext } from '../utils/shopContext';
import SearchBar from './SearchBar';
import MisaakaLogo from './misaakaLogo';
import { useRouter } from 'next/router';

export default function Header() {
  const [isClicked, setisClicked] = useState(false);
  const router = useRouter();
  const {
    state: { cart },
  } = useContext(ShopContext);

  return (
    <header className="bg-rose-100 w-full">
      <div className="flex h-[50px] md:h-[60px] mx-auto max-w-screen-xl justify-between items-center px-4">
        <div className="flex items-center">
          {/* ====================BURGER=================== */}
          <div
            className="md:hidden w-6 float-right cursor-pointer mr-4"
            onClick={() => setisClicked(!isClicked)}
          >
            <div
              className={`w-5 h-[2px] bg-black m-1 ease-in duration-75 ${
                isClicked === true
                  ? 'rotate-45 bottom-0 translate-y-1'
                  : 'rotate-0'
              }`}
            ></div>
            <div
              className={`w-5 h-[2px]  bg-black m-1 ease-in duration-75 ${
                isClicked === true ? 'hidden' : 'block'
              }`}
            ></div>
            <div
              className={`w-5 h-[2px]  bg-black m-1 ${
                isClicked === true
                  ? '-rotate-45 -translate-y-1 ease-in duration-75'
                  : 'rotate-0'
              }`}
            ></div>
          </div>

          {/* ====================SITE TITLE=================== */}
          <div
            className="font-bold text-xl text-heading w-[100px] h-auto cursor-pointer"
            onClick={() => router.push('/')}
          >
            <MisaakaLogo />
          </div>
        </div>

        {/* ====================NAVBAR FOR MOBILE=================== */}
        <nav
          className={`absolute transition-[left] text-heading text-center p-6 top-0  z-50 ease-in duration-300 min-h-screen w-full bg-rose-50 ${
            isClicked ? ' left-0' : '-left-full'
          }`}
        >
          {/* ====================NAVBAR CLOSE BURGER=================== */}

          <div
            className={`${
              isClicked
                ? 'block absolute top-6 right-6 cursor-pointer fill-rose-400 hover:fill-rose-700'
                : 'hidden '
            }`}
            onClick={() => setisClicked(!isClicked)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </div>
          {/* ====================NAVBAR INNER ITEMS/LIST=================== */}

          <h2
            className="font-bold text-2xl w-ful text-center flex justify-center cursor-pointer"
            onClick={() => router.push('/') && setisClicked(!isClicked)}
          >
            <MisaakaLogo />
          </h2>
          <ul className="flex flex-col w-full justify-center items-center tracking-wide">
            {/* ====================SEARCH BAR FOR MOBILE=================== */}
            <li className="font-semibold my-10 cursor-pointer border rounded">
              <SearchBar />
            </li>
            <Link href="/">
              <li
                className="font-semibold  cursor-pointer"
                onClick={() => setisClicked(false)}
              >
                Home
              </li>
            </Link>
            <Link href="/shop">
              <li
                className="font-semibold py-10 cursor-pointer"
                onClick={() => setisClicked(false)}
              >
                Shop
              </li>
            </Link>
            <Link href="/about">
              <li
                className="font-semibold  cursor-pointer"
                onClick={() => setisClicked(false)}
              >
                About
              </li>
            </Link>
          </ul>
        </nav>

        {/* ====================NAVBAR FOR PC=================== */}
        <div className="hidden md:block pt-2">
          <ul className="flex justify-between items-end text-heading uppercase">
            <Link href="/">
              <li className="font-neutral mx-2 cursor-pointer hover:text-active">
                Home
              </li>
            </Link>
            <Link href="/shop">
              <li className="font-neutral mx-2 cursor-pointer hover:text-active">
                Shop
              </li>
            </Link>
            <Link href="/about">
              <li className="font-neutral mx-2 cursor-pointer hover:text-active">
                About
              </li>
            </Link>
          </ul>
        </div>

        {/* ====================SEARCH ,ACCOUNT AND LOGIN=================== */}
        <div>
          <ul className="flex items-center">
            <li className="mr-2 block hidden md:block">
              <SearchBar />
            </li>

            {/* ========================================ACCOUNT ICON========================================= */}
            <li className="cursor-pointer">
              <Link href="/cart" passHref>
                <span className="relative">
                  {cart && cart.length > 0 && (
                    <div className="absolute text-[10px] z-10 w-4 h-4 flex justify-center items-center -top-2 left-3 bg-teal-400 text-dark rounded-full">
                      {cart.length}
                    </div>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="fill-[#F37979]"
                  >
                    <path d="M5 22h14c1.103 0 2-.897 2-2V9a1 1 0 0 0-1-1h-3V7c0-2.757-2.243-5-5-5S7 4.243 7 7v1H4a1 1 0 0 0-1 1v11c0 1.103.897 2 2 2zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v1H9V7zm-4 3h2v2h2v-2h6v2h2v-2h2l.002 10H5V10z"></path>
                  </svg>
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
