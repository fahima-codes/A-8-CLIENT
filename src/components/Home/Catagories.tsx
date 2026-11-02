'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

type Studio = { category?: string };

const categories = [
  { name: 'Photo Studio', icon: '📸', note: 'Cyc walls & softboxes' },
  { name: 'Film Stage', icon: '🎬', note: 'Sound stages & sets' },
  { name: 'Podcast Lounge', icon: '🎙️', note: 'Treated & mic-ready' },
  { name: 'Music Suite', icon: '🎵', note: 'Live rooms & amps' },
  { name: 'Workshop', icon: '🎨', note: 'Build & create' },
];

export default function Catagories() {
  const [studios, setStudios] = useState<Studio[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/studios`,
    )
      .then(res => res.json())
      .then(data => setStudios(Array.isArray(data) ? data : []))
      .catch(() => setStudios([]));
  }, []);

  const countFor = (name: string) =>
    studios.filter(s => s.category === name).length;

  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-20 sm:py-24 dark:bg-black">
      {/* decorative soft blobs (monochrome) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-zinc-200/50 blur-3xl dark:bg-zinc-800/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-zinc-300/40 blur-3xl dark:bg-zinc-800/30"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              BROWSE BY CATEGORY
            </span>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight dark:text-white sm:text-4xl">
              Every space has a vibe.
              <br className="hidden sm:block" /> Pick yours.
            </h2>
          </div>
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 rounded-full border border-zinc-900 bg-white px-5 py-2.5 text-sm font-bold transition hover:bg-zinc-900 hover:text-white dark:border-zinc-100 dark:bg-zinc-950 dark:text-white dark:hover:bg-white dark:hover:text-zinc-950"
          >
            View all studios
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-5">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={`/studios?category=${cat.name}`}
              className="group relative flex flex-col rounded-[24px] border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-900 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-white sm:p-6"
            >
              {/* index tag */}
              <span className="absolute right-4 top-4 text-[11px] font-bold text-zinc-300 dark:text-zinc-600">
                0{i + 1}
              </span>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-2xl transition-colors duration-300 dark:bg-zinc-800 group-hover:bg-zinc-900 group-hover:text-white dark:group-hover:bg-white">
                {cat.icon}
              </div>

              <p className="mt-4 text-sm font-bold leading-snug dark:text-white">{cat.name}</p>
              <p className="mt-1 text-[11px] leading-4 text-zinc-500 dark:text-zinc-400">
                {cat.note}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3 dark:border-zinc-700">
                <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500">
                  {countFor(cat.name)} space
                  {countFor(cat.name) === 1 ? '' : 's'}
                </span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
