'use client';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react';

const items = [
  {
    title: 'Liability Protection',
    desc: 'Up to $1M protection covering studio damages & gear.',
    icon: ShieldCheck,
  },
  {
    title: 'Verified Profiles',
    desc: 'Every creator & host is ID-verified for safe collaboration.',
    icon: BadgeCheck,
  },
  {
    title: 'Equipment Safety',
    desc: 'Secure digital check-in/out for all gears & props.',
    icon: PackageCheck,
  },
  {
    title: '24/7 Host Support',
    desc: 'Live chat & phone support for any booking issue.',
    icon: Headphones,
  },
];

export default function HostGuarantee() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-20 text-white sm:py-24">
      {/* decorative glows (monochrome) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/[0.06] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/[0.04] blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* left copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.18em] text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              PEACE OF MIND
            </span>

            <h2 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.75rem]">
              Host Guarantee &<br />
              creator protection.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-400">
              We protect your space, your gear, and your peace of mind — so you
              can focus on what matters: creating.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/add-studio"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-950 transition hover:bg-zinc-300"
              >
                Become a host
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Visit dashboard
              </Link>
            </div>

            {/* mini stats */}
            <div className="mt-10 flex gap-8 border-t border-white/10 pt-6">
              {[
                { k: '$1M+', v: 'Coverage' },
                { k: '10k+', v: 'Bookings' },
                { k: '24/7', v: 'Support' },
              ].map(s => (
                <div key={s.k}>
                  <p className="text-xl font-black">{s.k}</p>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-500">
                    {s.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* right cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {items.map(i => (
              <div
                key={i.title}
                className="group rounded-[20px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/[0.08]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-zinc-950">
                  <i.icon size={20} />
                </div>
                <h4 className="mt-4 text-sm font-bold">{i.title}</h4>
                <p className="mt-1.5 text-xs leading-5 text-zinc-400">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
