import React from 'react';
import Image from 'next/image';

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div
    className={`relative overflow-hidden cursor-pointer -ml-1 md:ml-0 h-auto w-[100%] bg-transparent block  ${
      selected ? 'opacity-100 p-1' : ' opacity-50'
    }`}
  >
    <button onClick={onClick} className="w-[100%] h-[100%] p-2" type="button">
      <Image
        src={imgSrc}
        width="200"
        height="200"
        layout="responsive"
        objectFit="cover"
        alt="A cool cat."
        className="absolute -left-[10000%] -right-[10000%] m-auto min-w-[1000%] min-h-[1000%] max-w-none scale-100 transition-[opacity]  duration-150"
        priority
      />
    </button>
  </div>
);
