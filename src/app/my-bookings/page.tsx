'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

type Booking = {
  _id: string;
  studioTitle: string;
  studioImage: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  status: string;
};

export default function MyBookingsPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user?.email) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${user.email}`,
      );
      const data = await res.json();
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchBookings();
  }, [user?.email]);

  const handleCancel = async () => {
    if (!cancelId) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${cancelId}`,
      { method: 'DELETE' },
    );
    if (res.ok) {
      toast.success('Booking cancelled');
      setBookings(prev => prev.filter(b => b._id !== cancelId));
      setCancelId(null);
    }
  };

  const getStatusStyle = (s: string) => {
    if (s === 'Pending') return 'bg-amber-100 text-amber-700';
    if (s === 'Confirmed') return 'bg-emerald-100 text-emerald-700';
    if (s === 'Completed') return 'bg-blue-100 text-blue-700';
    return 'bg-red-100 text-red-700';
  };

  if (loading && !user)
    return (
      <main className="grid min-h-[60vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-black">My Bookings</h1>
        <p className="text-zinc-500 mt-1">{bookings.length} bookings found</p>
        {bookings.length === 0 ? (
          <div className="mt-20 rounded-3xl border border-dashed bg-white py-16 text-center">
            <h3 className="text-xl font-bold">No bookings yet</h3>
            <Link
              href="/studios"
              className="mt-5 inline-block rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
            >
              Explore Studios
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {bookings.map(b => (
              <div
                key={b._id}
                className="flex gap-5 rounded-3xl border bg-white p-5"
              >
                <img
                  src={b.studioImage}
                  className="h-24 w-32 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{b.studioTitle}</h3>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${getStatusStyle(
                        b.status,
                      )}`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500">
                    {b.location} · {b.date} · {b.startTime} - {b.endTime}
                  </p>
                  <p className="mt-1 font-black">${b.hourlyRate}/hr</p>
                </div>
                <button
                  onClick={() => setCancelId(b._id)}
                  className="h-fit rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-red-600"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {cancelId && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center">
            <h3 className="text-lg font-black">Cancel this booking?</h3>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 rounded-full border py-3 font-bold"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 rounded-full bg-red-600 py-3 font-bold text-white"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
