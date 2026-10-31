'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

const slides = [
  {
    image:
      'https://tse3.mm.bing.net/th/id/OIP.4ZEu_ZzpGKl3bF1aP5GY6AHaEL?r=0&pid=Api&h=220&P=0',
    title: 'Book Your Perfect Creative Space',
    subtext:
      'Discover premium studios for photoshoots, podcasts, music & more in your city',
  },
  {
    image:
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600',
    title: 'Shoot. Record. Create.',
    subtext: 'Verified spaces trusted by 10,000+ creators worldwide',
  },
  {
    image:
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1600',
    title: 'Host Your Space & Start Earning',
    subtext: 'List your studio and earn up to $5000 per month',
  },
];

export default function Banner() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-6">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-[520px] overflow-hidden rounded-[2.5rem] md:h-[600px]"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
                <h1 className="max-w-[650px] text-[36px] font-bold leading-[1.1] text-white md:text-[60px]">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-[500px] text-zinc-200">
                  {slide.subtext}
                </p>
                <div className="mt-8 flex gap-3">
                  <Link
                    href="/studios"
                    className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black"
                  >
                    Explore Studios
                  </Link>
                  <Link
                    href="/studios"
                    className="rounded-full border border-white px-7 py-3.5 text-sm font-semibold text-white"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
