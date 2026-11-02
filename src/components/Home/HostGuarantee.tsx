'use client';
import Link from 'next/link';
import { Camera, CreditCard, Rocket, Search, Sparkles } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Discover Spaces',
    desc: 'Browse verified photo cyc walls, sound stages & podcast lounges near you.',
    icon: Search,
  },
  {
    id: '02',
    title: 'Select Shoot Hours',
    desc: 'Check real-time availability, hourly rate & amenities.',
    icon: Camera,
  },
  {
    id: '03',
    title: 'Book Instantly',
    desc: 'Secure booking with transparent pricing & instant confirmation.',
    icon: CreditCard,
  },
  {
    id: '04',
    title: 'Create & Produce',
    desc: 'Show up, create magic, and get support 24/7 if needed.',
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f5] py-20 sm:py-24 dark:bg-zinc-950">
      {/* decorative */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-6 top-8 hidden text-5xl text-zinc-200 dark:text-zinc-800 lg:block"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute right-10 bottom-10 hidden text-6xl text-zinc-200 dark:text-zinc-800 lg:block"
      >
        ✧
      </span>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <Sparkles size={13} />
            HOW IT WORKS
          </span>
          <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-zinc-950 sm:text-4xl dark:text-white">
            Booking built for creators.
            <br />
            Four simple steps.
          </h2>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            From discovery to wrap — everything lives in one place.
          </p>
        </div>

        {/* steps */}
        <div className="relative mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* dashed connector (desktop) */}
          <div
            aria-hidden
            className="absolute left-[12%] right-[12%] top-12 hidden border-t-2 border-dashed border-zinc-300 dark:border-zinc-700 lg:block"
          />

          {steps.map(s => (
            <div
              key={s.id}
              className="group relative rounded-[24px] border border-zinc-200 bg-white/70 p-6 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-zinc-900 hover:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-none dark:hover:border-zinc-500"
            >
              {/* number chip overlapping top */}
              <div className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-xs font-black text-white shadow-lg ring-4 ring-[#f7f7f5] transition-colors group-hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 dark:ring-zinc-950 dark:group-hover:bg-zinc-300">
                {s.id}
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-900 transition-colors group-hover:bg-zinc-950 group-hover:text-white dark:bg-zinc-800 dark:text-white dark:group-hover:bg-white dark:group-hover:text-zinc-950">
                <s.icon size={20} />
              </div>

              <h3 className="mt-4 font-bold leading-snug dark:text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/studios"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            Start exploring studios
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
