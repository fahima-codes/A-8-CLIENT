'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function DashboardPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user as any;
  const [stats, setStats] = useState({
    listings: 0,
    bookings: 0,
    earnings: 0,
    pending: 0,
  });

  useEffect(() => {
    if (!user?.email) return;
    const fetchStats = async () => {
      try {
        const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const [listingsRes, bookingsRes] = await Promise.all([
          fetch(`${API}/studios?email=${user.email}`),
          fetch(`${API}/bookings?email=${user.email}`),
        ]);
        const listings = await listingsRes.json();
        const bookings = await bookingsRes.json();
        setStats({
          listings: Array.isArray(listings) ? listings.length : 0,
          bookings: Array.isArray(bookings) ? bookings.length : 0,
          earnings: Array.isArray(bookings) ? bookings.length * 50 : 0,
          pending: Array.isArray(bookings)
            ? bookings.filter((b: any) => b.status === 'Pending').length
            : 0,
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchStats();
  }, [user?.email]);

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-black">
          Welcome, {user?.name || 'Creator'}!
        </h1>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-zinc-500">My Listings</p>
            <p className="mt-2 text-3xl font-black">{stats.listings}</p>
          </div>
          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-zinc-500">Bookings</p>
            <p className="mt-2 text-3xl font-black">{stats.bookings}</p>
          </div>
          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-zinc-500">Earnings</p>
            <p className="mt-2 text-3xl font-black">${stats.earnings}</p>
          </div>
          <div className="rounded-3xl border bg-white p-6">
            <p className="text-sm text-zinc-500">Pending</p>
            <p className="mt-2 text-3xl font-black">{stats.pending}</p>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <Link
            href="/add-studio"
            className="rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
          >
            + Add New Studio
          </Link>
          <Link
            href="/my-listings"
            className="rounded-full border bg-white px-6 py-3 text-sm font-bold"
          >
            My Listings
          </Link>
          <Link
            href="/my-bookings"
            className="rounded-full border bg-white px-6 py-3 text-sm font-bold"
          >
            My Bookings
          </Link>
        </div>
      </div>
    </main>
  );
}
