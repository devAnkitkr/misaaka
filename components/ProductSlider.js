import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function ProductSlider(props) {
  const { products } = props;
  const router = useRouter();
  const options = { delay: 3000 }; // Options
  const autoplayRoot = (emblaRoot) => emblaRoot.parentElement; // Root node
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay(options, autoplayRoot),
  ]);

  return (
    <div className="my-20 px-4">
      <h1 className="font-bold text-xl text-heading">Latest collection</h1>
      <p className="text-caption">
        Each season, we collaborate with local artisans to create a collection
        inspired by the natural world.
      </p>
      <div className="embla overflow-hidden text-left" ref={emblaRef}>
        <div className="embla_container flex flex-row">
          {products.map((product, index) => (
            <div
              className="embla__slide relative my-4 p-2 md:p-4 text-sm flex-[0_0_35%] md:flex-[0_0_34%] cursor-pointer rounded-lg"
              onClick={() => router.push(`/products/${product.slug}`)}
              key={index}
            >
              <Image
                src={product.images[1]}
                alt={product.name}
                width="200"
                height="200"
                layout="responsive"
                objectFit="cover"
                className="rounded-lg"
              />
              <div className="flex flex-col items-center text-center mt-1 ">
                <h2 className="font-semibold md:text-lg text-heading">
                  {product.name}
                </h2>
                <p className="text-caption">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
