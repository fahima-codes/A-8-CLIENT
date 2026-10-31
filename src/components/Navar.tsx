'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Aperture,
  Menu,
  X,
  LayoutDashboard,
  Plus,
  List,
  CalendarCheck,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Studios', href: '/studios' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'About Us', href: '#about' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // TODO: Replace with your NextAuth session
  const isAuthenticated = false; // true korle authenticated view dekhte parba
  const user = {
    name: 'Rahim Ahmed',
    email: 'rahim@test.com',
    image: 'https://i.pravatar.cc/100?img=12',
  };

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-white">
            <Aperture size={20} />
          </div>
          <span className="text-[20px] font-bold tracking-tight">
            StudioSpace
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map(link => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition ${active ? 'text-black' : 'text-zinc-500 hover:text-black'}`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-black" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <Image
                  src={user.image}
                  alt="avatar"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-200"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white p-2 shadow-2xl">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-zinc-500">{user.email}</p>
                  </div>
                  <div className="my-1 h-px bg-zinc-100" />
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/dashboard/add-studio"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100"
                  >
                    <Plus size={16} /> Add New Studio
                  </Link>
                  <Link
                    href="/dashboard/my-listings"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100"
                  >
                    <List size={16} /> My Studio Listings
                  </Link>
                  <Link
                    href="/dashboard/my-bookings"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100"
                  >
                    <CalendarCheck size={16} /> My Bookings
                  </Link>
                  <div className="my-1 h-px bg-zinc-100" />
                  <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="border-t bg-white px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(l => (
              <Link key={l.name} href={l.href}>
                {l.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link href="/login">Login</Link>
                <Link
                  href="/register"
                  className="rounded-full bg-black px-6 py-2.5 text-center text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
