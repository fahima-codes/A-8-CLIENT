'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Photo Studio', icon: '📸' },
  { name: 'Film Stage', icon: '🎬' },
  { name: 'Podcast Lounge', icon: '🎙️' },
  { name: 'Music Suite', icon: '🎵' },
  { name: 'Workshop', icon: '🎨' },
];

export default function Catagories() {
  const [studios, setStudios] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/studios`,
    )
      .then(res => res.json())
      .then(data => setStudios(Array.isArray(data) ? data : []));
  }, []);

  return (
    <>
      {/* 2. Browse by Categories - Yellow Part - Toggle er moto card */}
      <div className="py-16 bg-white dark:bg-black">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-black">Browse by Categories</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-5">
            {categories.map(cat => (
              <Link
                key={cat.name}
                href={`/studios?category=${cat.name}`}
                className="group rounded-[24px] border bg-[#f7f7f5] p-6 text-center transition-all hover:-translate-y-1 hover:bg-black hover:text-white dark:bg-zinc-900"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl group-hover:bg-white">
                  {' '}
                  {cat.icon}{' '}
                </div>
                <p className="mt-4 text-sm font-bold">{cat.name}</p>
                <p className="mt-1 text-[11px] opacity-60">Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
