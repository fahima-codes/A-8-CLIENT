import Link from 'next/link';
import { Aperture, Home, Film } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="relative grid min-h-[80vh] place-items-center overflow-hidden bg-[#f7f7f5] px-6 dark:bg-zinc-950">
      {/* film-strip top border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 flex h-6 overflow-hidden"
      >
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            className="mx-1 mt-1 h-4 w-8 rounded-sm bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>

      <div className="relative text-center">
        {/* creative studio illustration */}
        <div className="relative mx-auto mb-8 h-40 w-40">
          <div className="absolute inset-0 grid place-items-center rounded-[36px] border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <Aperture size={72} className="text-zinc-900 dark:text-white" />
          </div>
          {/* spotlight corner accents */}
          <span className="absolute -left-4 -top-4 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-2xl dark:border-zinc-800 dark:bg-zinc-900">
            🎬
          </span>
          <span className="absolute -bottom-4 -right-4 rounded-2xl border border-zinc-200 bg-white px-4 py-2 text-2xl dark:border-zinc-800 dark:bg-zinc-900">
            ⚡
          </span>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400">
          Scene missing · Error 404
        </p>
        <h1 className="mt-3 text-5xl font-black tracking-tight text-zinc-950 sm:text-6xl dark:text-white">
          This set wasn&apos;t built yet.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500 dark:text-zinc-400">
          The page you&apos;re looking for is out of frame. Let&apos;s get
          <Film size={14} className="mx-1 inline text-zinc-900 dark:text-white" />
          back to the studio floor.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-zinc-950 px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            <Home size={16} />
            Return to Home
          </Link>
          <Link
            href="/studios"
            className="inline-flex items-center rounded-full border border-zinc-300 px-7 py-3.5 text-sm font-bold text-zinc-900 transition hover:bg-white dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
          >
            Explore Studios
          </Link>
        </div>
      </div>
    </main>
  );
}
