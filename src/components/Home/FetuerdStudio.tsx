'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/studios`,
    )
      .then(res => res.json())
      .then(data => setStudios(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="py-16 bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Featured Studios</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Top-rated creative spaces for your next project
            </p>
          </div>
          <div className="hidden md:flex gap-2">
            <button className="swiper-prev rounded-full border w-10 h-10 font-bold">
              ←
            </button>
            <button className="swiper-next rounded-full border w-10 h-10 font-bold bg-black text-white">
              →
            </button>
          </div>
        </div>

        <div className="mt-8">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: '.swiper-prev',
              nextEl: '.swiper-next',
            }}
          >
            {studios.slice(0, 6).map((s: any) => (
              <SwiperSlide key={s._id}>
                <div className="rounded-[24px] border bg-white p-3 dark:bg-zinc-900">
                  <img
                    src={s.image || s.imageUrl}
                    alt={s.title}
                    className="h-48 w-full rounded-[18px] object-cover"
                  />
                  <div className="p-3">
                    <span className="inline-block rounded-full bg-black px-3 py-1 text-[10px] font-bold text-white">
                      {s.category}
                    </span>
                    <h3 className="mt-2 font-bold truncate">{s.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      ${s.hourlyRate} / hr • {s.location}
                    </p>
                    <Link
                      href={`/studios/${s._id}`}
                      className="mt-3 block rounded-full bg-black py-2.5 text-center text-sm font-bold text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {studios.length === 0 && (
          <p className="mt-10 text-center text-sm text-zinc-400">
            No studios found.
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
        }
      `}</style>
    </div>
  );
}
