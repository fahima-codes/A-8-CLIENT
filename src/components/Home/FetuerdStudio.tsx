'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Star,
} from 'lucide-react';

type Studio = {
  _id: string;
  title: string;
  category?: string;
  image?: string;
  imageUrl?: string;
  rating?: number;
  hourlyRate?: number;
  location?: string;
};

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/studios`,
    )
      .then(res => res.json())
      .then(data => setStudios(Array.isArray(data) ? data : []))
      .catch(() => setStudios([]));
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              FEATURED STUDIOS
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
              Top-rated spaces,
              <br className="hidden sm:block" /> ready to shoot.
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Hand-picked creative spaces loved by our community.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/studios"
              className="group hidden items-center gap-2 rounded-full border border-zinc-900 px-5 py-2.5 text-sm font-bold transition hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950 sm:inline-flex"
            >
              View all
              <ArrowRight
                size={15}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            {/* swiper nav */}
            <div className="hidden gap-2 md:flex">
              <button
                aria-label="Previous"
                className="swiper-prev flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 transition hover:border-zinc-900 hover:bg-zinc-900 hover:text-white disabled:opacity-30 dark:border-zinc-800 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-zinc-950"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Next"
                className="swiper-next flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white transition hover:bg-zinc-700 disabled:opacity-30 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          navigation={{ prevEl: '.swiper-prev', nextEl: '.swiper-next' }}
          className="mt-10 !pb-4"
        >
          {(studios.length ? studios.slice(0, 6) : Array<Studio | null>(3).fill(null)).map(
            (s, i) => (
              <SwiperSlide key={s?._id ?? i}>
                {s ? (
                  <Link
                    href={`/studios/${s._id}`}
                    className="group block overflow-hidden rounded-[24px] border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-600"
                  >
                    {/* image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={s.image || s.imageUrl}
                        alt={s.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                      {/* category chip */}
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow">
                        {s.category}
                      </span>

                      {/* rating badge */}
                      <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                        <Star
                          size={12}
                          className="fill-white text-white"
                        />
                        {s.rating ?? '4.8'}
                      </span>

                      {/* price pill */}
                      <span className="absolute bottom-4 left-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-black text-zinc-900 shadow">
                        ${s.hourlyRate}
                        <span className="font-medium text-zinc-400">/hr</span>
                      </span>
                    </div>

                    {/* body */}
                    <div className="p-5">
                      <h3 className="truncate text-base font-black dark:text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <MapPin size={13} className="shrink-0" />
                        <span className="truncate">{s.location}</span>
                      </p>

                      <div className="mt-4 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3.5 dark:border-zinc-700">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                          <Clock size={12} />
                          Instant book
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-900 transition-colors group-hover:text-zinc-600 dark:text-white dark:group-hover:text-zinc-300">
                          View details
                          <ArrowRight
                            size={14}
                            className="transition-transform group-hover:translate-x-1"
                          />
                        </span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* skeleton */
                  <div className="overflow-hidden rounded-[24px] border border-zinc-100 dark:border-zinc-800">
                    <div className="h-56 animate-pulse bg-zinc-100 dark:bg-zinc-800" />
                    <div className="space-y-3 p-5">
                      <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                      <div className="h-10 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-800" />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ),
          )}
        </Swiper>

        {studios.length === 0 && (
          <p className="mt-6 text-center text-sm text-zinc-400">
            Couldn&apos;t load studios — is the API running?
          </p>
        )}
      </div>

      <style jsx global>{`
        .swiper-prev,
        .swiper-next {
          cursor: pointer;
        }
        .swiper-button-disabled {
          opacity: 0.3;
          pointer-events: auto;
        }
      `}</style>
    </section>
  );
}
