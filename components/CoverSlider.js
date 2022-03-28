import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CoverSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const router = useRouter();

  return (
    <div className="embla overflow-hidden mt-4 mx-4 relative" ref={emblaRef}>
      <div className="embla_container flex">
        <div
          className="embla__slide relative h-[300px] md:min-h-[500px]"
          style={{ flex: '0 0 100%' }}
        >
          <Image
            src="/static/banner6.jpg"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <div
          className="embla__slide relative h-[300px] md:h-auto"
          style={{ flex: '0 0 100%' }}
        >
          <Image src="/static/banner2.jpg" layout="fill" objectFit="cover" />
        </div>

        <div
          className="embla__slide relative h-[300px] md:h-auto"
          style={{ flex: '0 0 100%' }}
        >
          <Image src="/static/banner3.jpg" layout="fill" objectFit="cover" />
        </div>
      </div>
      <div className="w-full h-full absolute top-0 left-0 bg-zinc-900/20 flex flex-col justify-center items-center text-white font-bold text-lg md:text-2xl">
        <span className="text-center mb-2 md:mb-4">
          COME SEE <br />
          WHAT YOU LOVE!
        </span>
        <span className="text-base text-center font-normal px-2">
          Crockery | Stoneware | Ceramics | Decor
        </span>
        <button
          className="rounded bg-rose-400 px-4 md:px-6 py-1 my-2 mt-4 text-white font-normal text-base md:text-lg font-bold hover:bg-rose-500 transition-[bg-color] ease-in duration-150"
          onClick={() => router.push('/shop')}
        >
          SHOP NOW!
        </button>
      </div>
    </div>
  );
};

export default CoverSlider;
