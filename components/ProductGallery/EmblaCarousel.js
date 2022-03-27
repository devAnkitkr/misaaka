import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Thumb } from './EmblaCarouselThumb';
import Image from 'next/image';

const EmblaCarousel = ({ images, slides }) => {
  const media = [...images];
  const mediaByIndex = (index) => media[index % media.length];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    selectedClass: '',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!embla || !emblaThumbs) return;
      if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="relative bg-gray md:pl-0 mx-auto">
        <div className="overflow-hidden w-full" ref={mainViewportRef}>
          <div className="flex -ml-4 border">
            {slides.map((index) => (
              <div className="pl-4 min-w-full relative" key={index}>
                <div className="relative overflow-hidden min-w-full min-h-[350px] md:h-[490px] md:h-[590px] lg:h-[690px]">
                  <Image
                    layout="fill"
                    className="absolute bg-rose-50 block top-0 object-scale-down w-full max-w-auto h-auto -translate-x-[0%] -translate-y-[0%]"
                    src={mediaByIndex(index)}
                    alt="A cool cat."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative  max-w-[720px] mx-auto embla-thumb">
        <div className="overflow-hidden w-[100%]" ref={thumbViewportRef}>
          <div className="flex cursor-pointer ml-0 md:-ml-2">
            {slides.map((index) => (
              <Thumb
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                imgSrc={mediaByIndex(index)}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmblaCarousel;
