'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Search, SlidersHorizontal, Star } from 'lucide-react';

type Studio = {
  _id: string;
  image: string;
  title: string;
  category: string;
  rating?: number;
  reviews?: number;
  location: string;
  hourlyRate: number;
};

export default function AllStudioPage() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All spaces');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStudios() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);
        if (!res.ok) throw new Error('Studios could not be loaded');

        const data = await res.json();
        setStudios(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadStudios();
  }, []);

  const categories = useMemo(
    () => ['All spaces', ...new Set(studios.map(studio => studio.category))],
    [studios],
  );

  const filteredStudios = studios.filter(studio => {
    const text =
      `${studio.title} ${studio.category} ${studio.location}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesCategory =
      category === 'All spaces' || studio.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">
            Find your creative space
          </p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black tracking-tight text-zinc-950 sm:text-5xl">
                Spaces that spark
                <span className="text-zinc-400"> ideas.</span>
              </h1>
              <p className="mt-3 max-w-xl text-zinc-600">
                Explore inspiring studios for your next shoot, recording, or
                creative project.
              </p>
            </div>
            <span className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700">
              {filteredStudios.length} spaces
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-2xl bg-zinc-100 px-4 py-3.5">
              <Search size={19} className="shrink-0 text-zinc-500" />
              <input
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search by studio, category, or location..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
              />
            </label>

            <label className="flex items-center gap-2 rounded-2xl border border-zinc-200 px-4 py-3">
              <SlidersHorizontal size={17} className="text-zinc-500" />
              <select
                value={category}
                onChange={event => setCategory(event.target.value)}
                className="min-w-36 bg-transparent text-sm font-semibold outline-none"
              >
                {categories.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map(item => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                  category === item
                    ? 'bg-zinc-950 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(item => (
              <div
                key={item}
                className="h-[360px] animate-pulse rounded-3xl bg-zinc-200"
              />
            ))}
          </div>
        ) : filteredStudios.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudios.map(studio => (
              <article
                key={studio._id}
                className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-60 overflow-hidden bg-zinc-200">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-zinc-800">
                    {studio.category}
                  </span>

                  <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-zinc-950/80 px-3 py-1.5 text-xs font-bold text-white">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {studio.rating ?? 'New'}
                  </span>

                  <p className="absolute bottom-4 left-4 text-xs font-medium text-white/90">
                    CREATIVE SPACE · DHAKA
                  </p>
                </div>

                <div className="p-5">
                  <h2 className="truncate text-lg font-extrabold text-zinc-950">
                    {studio.title}
                  </h2>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-zinc-500">
                    <MapPin size={15} />
                    <span className="truncate">{studio.location}</span>
                  </p>

                  <div className="mt-5 flex items-end justify-between border-t border-zinc-100 pt-4">
                    <p className="text-2xl font-black text-zinc-950">
                      ${studio.hourlyRate}
                      <span className="ml-1 text-sm font-medium text-zinc-500">
                        / hour
                      </span>
                    </p>

                    <Link
                      href={`/studios/${studio._id}`}
                      className="rounded-full bg-zinc-950 px-5 py-3 text-xs font-bold text-white transition hover:bg-zinc-700"
                    >
                      View space
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-bold text-zinc-900">No spaces found</p>
            <p className="mt-2 text-sm text-zinc-500">
              Try another search or select a different category.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All spaces');
              }}
              className="mt-5 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
