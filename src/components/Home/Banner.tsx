'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'SPACE TO CREATE',
    title: 'Find the space behind your next great idea.',
    subtext:
      'From photo studios to podcast rooms, discover inspiring creative spaces around you.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'MAKE SOMETHING GREAT',
    title: 'Shoot. Record. Create.',
    subtext:
      'Book a space that fits your project, your crew, and your creative vision.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2000&q=85',
    eyebrow: 'HOST YOUR SPACE',
    title: 'Your studio could inspire the next big thing.',
    subtext:
      'Share your creative space with photographers, filmmakers, and makers in your city.',
  },
];

export default function Banner() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="studio-hero h-[520px] overflow-hidden rounded-[28px] sm:h-[560px] lg:h-[650px]"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.title}>
            <div className="relative h-full w-full overflow-hidden bg-zinc-900">
              <img
                src={slide.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

              <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center px-7 pb-10 sm:px-12 lg:px-20">
                <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-white backdrop-blur-md">
                  <Sparkles size={14} className="text-amber-300" />
                  {slide.eyebrow}
                </div>

                <h1 className="max-w-3xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-7xl">
                  {slide.title}
                </h1>

                <p className="mt-5 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                  {slide.subtext}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/studios"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200"
                  >
                    Explore studios
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <Link
                    href="/add-studio"
                    className="rounded-full border border-white/60 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-zinc-950"
                  >
                    Host your space
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 hidden rounded-2xl border border-white/20 bg-black/25 px-5 py-4 text-white backdrop-blur-md md:block">
                <p className="text-xs text-white/70">Find your next</p>
                <p className="mt-1 font-bold">Creative home base.</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .studio-hero .swiper-pagination {
          bottom: 24px !important;
          text-align: left;
          padding-left: 32px;
        }

        .studio-hero .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: white;
          opacity: 0.55;
          transition: all 0.25s ease;
        }

        .studio-hero .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          opacity: 1;
        }

        @media (min-width: 640px) {
          .studio-hero .swiper-pagination {
            padding-left: 48px;
          }
        }

        @media (min-width: 1024px) {
          .studio-hero .swiper-pagination {
            padding-left: 80px;
          }
        }
      `}</style>
    </section>
  );
}
