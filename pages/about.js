import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-screen-xl p-4 my-10">
      <h1 className="text-heading text-xl my-4 border-b">About me</h1>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full flex flex-col md:w-4/12 my-4">
          <Image
            src="/about/akansha.jpg"
            alt="misaaka owner image"
            width="400"
            height="400"
            layout="responsive"
            objectFit="cover"
            className="w-full"
          />
          <div className="flex flex-row justify-center my-2 w-full">
            <a
              href="https://www.facebook.com/misaaka.collection"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              <span className="fill-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
                </svg>
              </span>
            </a>
            <a
              href="https://www.instagram.com/misaaka.collection/"
              target="_blank"
              rel="noreferrer"
              className="mx-1"
            >
              <span className="fill-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                  <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                  <circle cx="16.806" cy="7.207" r="1.078"></circle>
                  <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
        <div className="text-caption w-full my-4 md:pl-8">
          <p>
            We all have experiences of our own, but the one which makes a
            difference is worth to tell. I haven &apos;t gone through any
            revolution but what life taught me, resulted in my evolution. I had
            my own set of choices, I had different maths of plan, but leaving
            all that behind, here I am with all new brand.{' '}
          </p>
          <p>
            I wonder if I would have gone abroad for my further studies after
            getting discharged from ten long years of 'sick bed', if I would
            have followed those plans which I wrote in my scrapbook, neither I
            would be telling this story nor you will be interested to read one.{' '}
          </p>{' '}
          <p>
            I won't blame this pandemic which got me into this business or the
            circumstances which bring me here. We all have a pleasant smell of
            interest embedded in our soul, which we need to sense at once. I did
            not find Misaaka, I found my soul, my happiness, my subject of
            interest in the form of this tiny circular logo named 'MISAAKA'.
          </p>
          <p>
            Yes I sometimes encounter with moments of doubts, stupid things,
            mistakes and problems, but what keeps me going is those happy DMs or
            full star rating after delivering the pack of satisfaction to
            thousands of customer.
          </p>{' '}
          <p>
            I was lost in my own bucket list but then gradually, the picture of
            my goals and ambitions started to clear. Those underrated yet
            talented and dedicated local artisans are now getting rewarded for
            their work with what they always deserved, just because of my little
            cause of action. Always remember, do not dishearten or dissuade by
            failures, it happens only because better sets of plans are made for
            your success.
          </p>
        </div>
      </div>
    </div>
  );
}
