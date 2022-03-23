import React from 'react';
import Link from 'next/link';
import MisaakaLogo from './misaakaLogo';
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="bg-rose-50 w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex flex-col items-center">
        <span onClick={() => router.push('/')}>
          <MisaakaLogo />
        </span>
        <nav className="my-2 cursor-pointer">
          <ul className="flex">
            <Link href="/shop" passHref>
              <li className="px-2 text-caption hover:text-heading">Shop</li>
            </Link>
            <Link href="/about" passHref>
              <li className="px-2 text-caption hover:text-heading">About</li>
            </Link>
            <Link href="/contact" passHref>
              <li className="px-2 text-caption hover:text-heading">Contact</li>
            </Link>
            <Link href="/shippingreturn" passHref>
              <li className="px-2 text-caption hover:text-heading">
                Shipping & Return
              </li>
            </Link>
          </ul>
        </nav>
        <ul className="flex my-10 ">
          <a
            href="https://www.facebook.com/misaaka.collection"
            target="_blank"
            rel="noreferrer"
          >
            <li className="px-2 text-caption fill-teal-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
              </svg>
            </li>
          </a>
          <a
            href="https://www.instagram.com/misaaka.collection/"
            target="_blank"
            rel="noreferrer"
          >
            <li className="px-2 text-caption  fill-teal-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                <circle cx="16.806" cy="7.207" r="1.078"></circle>
                <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
              </svg>
            </li>
          </a>
        </ul>
        <span className="text-caption text-sm">All right reserverd © 2022</span>
      </div>
    </footer>
  );
}
