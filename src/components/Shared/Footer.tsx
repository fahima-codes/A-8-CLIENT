import Link from 'next/link';
import { Aperture, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-[#0a0a0a] text-zinc-300">
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* 1. Branding + Mission */}
          <div>
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black">
                <Aperture size={18} />
              </div>
              <span className="text-[18px] font-bold tracking-tight">
                StudioSpace
              </span>
            </Link>
            <p className="mt-4 max-w-[280px] text-[12px] leading-[1.6] text-zinc-400">
              Peer-to-peer marketplace for creators to discover, filter, and
              book verified photo cycs, cinema sound stages, podcast lounges,
              and music suites.
            </p>
            <p className="mt-6 text-[11px] text-zinc-500">
              © 2026 StudioSpace. All rights reserved. Terms & Privacy
            </p>
          </div>

          {/* 2. Quick Navigation */}
          <div>
            <h4 className="text-[12px] font-bold text-white">
              Quick Navigation
            </h4>
            <ul className="mt-4 space-y-2 text-[12px] text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-white">
                  Explore Studios
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Popular Categories */}
          <div>
            <h4 className="text-[12px] font-bold text-white">
              Popular Categories
            </h4>
            <ul className="mt-4 space-y-2 text-[12px] text-zinc-400">
              <li>
                <Link
                  href="/studios?category=Photo Studio"
                  className="hover:text-white"
                >
                  Photo Studios
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Film Stage"
                  className="hover:text-white"
                >
                  Sound Stages
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Podcast Lounge"
                  className="hover:text-white"
                >
                  Podcast Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Music Suite"
                  className="hover:text-white"
                >
                  Music Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/studios?category=Workshop"
                  className="hover:text-white"
                >
                  Art Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Newsletter + Social X Logo */}
          <div>
            <h4 className="text-[12px] font-bold text-white">
              Stay in the Loop
            </h4>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-10 flex-1 items-center rounded-full bg-zinc-900 px-4">
                <Mail size={14} className="text-zinc-500" />
                <input
                  placeholder="Your email"
                  className="ml-2 w-full bg-transparent text-[12px] outline-none placeholder:text-zinc-500"
                />
              </div>
              <button className="h-10 rounded-full bg-white px-5 text-[12px] font-bold text-black">
                Subscribe
              </button>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-[12px] font-bold hover:bg-zinc-800"
              >
                f
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-[12px] font-bold hover:bg-zinc-800"
              >
                ig
              </Link>
              {/* New X Logo - NOT old twitter bird */}
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-[14px] font-bold hover:bg-zinc-800"
              >
                𝕏
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
