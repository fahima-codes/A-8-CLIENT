'use client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

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
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

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
    fetchBookings();
  }, [user]);

  const handleCancel = async (id: string) => {
    const ok = confirm('Cancel this booking?');
    if (!ok) return;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`,
      { method: 'DELETE' },
    );
    if (res.ok) {
      toast.success('Booking cancelled');
      setBookings(prev => prev.filter(b => b._id !== id));
    }
  };

  if (loading) return <main className="p-10">Loading bookings...</main>;

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-4xl font-black">My Bookings</h1>
        <p className="text-zinc-500 mt-1">{bookings.length} bookings found</p>

        {bookings.length === 0 ? (
          <div className="mt-20 text-center">
            <h3 className="text-xl font-bold">No bookings yet</h3>
            <p className="text-zinc-500">
              Explore studios and book your first creative space
            </p>
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
                  <h3 className="font-bold">{b.studioTitle}</h3>
                  <p className="text-sm text-zinc-500">
                    {b.location} · {b.date} · {b.startTime} - {b.endTime}
                  </p>
                  <p className="mt-1 font-black">
                    ${b.hourlyRate}/hr ·{' '}
                    <span className="text-emerald-600 text-sm">{b.status}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(b._id)}
                  className="h-fit rounded-full bg-red-50 px-5 py-2 text-sm font-bold text-red-600"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
