import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const CoverSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  return (
    <div className="embla overflow-hidden mt-4 mx-4" ref={emblaRef}>
      <div className="embla_container flex">
        <div className="embla__slide relative" style={{ flex: '0 0 100%' }}>
          <Image
            src="/banners/banner1.JPG"
            width="900"
            height="500"
            layout="responsive"
            objectFit="cover"
            priority
          />
        </div>
        <div className="embla__slide relative" style={{ flex: '0 0 100%' }}>
          <Image
            src="/banners/banner2.jpg"
            width="900"
            height="500"
            layout="responsive"
            objectFit="cover"
          />
        </div>

        <div className="embla__slide relative" style={{ flex: '0 0 100%' }}>
          <Image
            src="/banners/banner3.jpg"
            width="900"
            height="500"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CoverSlider;
