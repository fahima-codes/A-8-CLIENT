'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import { toast } from 'sonner';
import ThemeToggle from '@/components/Shared/ThemeToggle';
import { authClient } from '@/lib/auth-client';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Studios', href: '/studios' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'About Us', href: '/about-us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Real better-auth session
  const { data: session } = authClient.useSession();
  const isAuthenticated = !!session?.user;
  const user = session?.user
    ? {
        name: session.user.name ?? 'Creator',
        email: session.user.email,
        image:
          session.user.image ?? 'https://i.pravatar.cc/100?img=12',
      }
    : null;

  async function handleLogout() {
    await authClient.signOut();
    setProfileOpen(false);
    setMobileOpen(false);
    toast.success('Logged out successfully');
    router.push('/');
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-zinc-100 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black transition dark:bg-white">
            <Aperture size={20} className="text-white dark:text-black" />
          </div>
          <span className="text-[20px] font-bold tracking-tight dark:text-white">
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
                className={`relative text-sm font-medium transition ${
                  active
                    ? 'text-black dark:text-white'
                    : 'text-zinc-500 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-black dark:bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Action */}
        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-300"
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
                  src={user!.image}
                  alt="avatar"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-zinc-100 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold dark:text-white">
                      {user!.name}
                    </p>
                    <p className="text-xs text-zinc-500">{user!.email}</p>
                  </div>
                  <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/add-studio"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <Plus size={16} /> Add New Studio
                  </Link>
                  <Link
                    href="/my-listings"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <List size={16} /> My Studio Listings
                  </Link>
                  <Link
                    href="/my-bookings"
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  >
                    <CalendarCheck size={16} /> My Bookings
                  </Link>
                  <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="dark:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      {mobileOpen && (
        <div className="border-t border-zinc-100 bg-white px-6 py-6 dark:border-zinc-800 dark:bg-zinc-950 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="dark:text-white"
              >
                {l.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  href="/add-studio"
                  onClick={() => setMobileOpen(false)}
                  className="dark:text-white"
                >
                  Add New Studio
                </Link>
                <Link
                  href="/my-listings"
                  onClick={() => setMobileOpen(false)}
                  className="dark:text-white"
                >
                  My Listings
                </Link>
                <Link
                  href="/my-bookings"
                  onClick={() => setMobileOpen(false)}
                  className="dark:text-white"
                >
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 text-left text-sm text-red-600 dark:text-red-400"
                >
                  <LogOut size={16} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="dark:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-black px-6 py-2.5 text-center text-white dark:bg-white dark:text-black"
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
