import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import EmblaCarousel from './EmblaCarousel';

export default function ProductGallery({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const SLIDE_COUNT = images.length;
  const slides = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="w-full h-auto">
      <EmblaCarousel images={images} slides={slides} />
    </div>
  );
}
