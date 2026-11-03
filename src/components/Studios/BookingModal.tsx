'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { getAuthToken } from '@/lib/getTokenFromServer';

type Studio = {
  _id: string;
  title: string;
  category?: string;
  image?: string;
  hourlyRate: number;
  securityDeposit?: number;
  location?: string;
};

export default function BookModal({ studio }: { studio: Studio }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const hours =
    date && startTime && endTime
      ? Math.max(
          0,
          (Number(endTime.split(':')[0]) +
            Number(endTime.split(':')[1]) / 60 -
            (Number(startTime.split(':')[0]) +
              Number(startTime.split(':')[1]) / 60)),
        )
      : 0;
  const total = hours * (studio.hourlyRate ?? 0);

  function handleOpen() {
    if (!user) {
      toast.error('Please log in to book this workspace.');
      router.push(`/login?redirect=/studios/${studio._id}`);
      return;
    }
    setOpen(true);
  }

  async function handleBook() {
    if (!date || !startTime || !endTime) {
      toast.error('Please select a date and time range.');
      return;
    }
    if (hours <= 0) {
      toast.error('End time must be after start time.');
      return;
    }

    setSubmitting(true);
    try {
      const token = await getAuthToken();

      if (!token) {
        toast.error('Could not get your login token. Please sign in again.');
        setSubmitting(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studioId: studio._id,
            studioTitle: studio.title,
            studioImage: studio.image,
            location: studio.location,
            hourlyRate: studio.hourlyRate,
            userEmail: user!.email,
            date,
            startTime,
            endTime,
            status: 'Pending',
          }),
        },
      );
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(data?.message ?? 'Booking failed — please try again.');
        setSubmitting(false);
        return;
      }

      toast.success('Booking request placed! Status: Pending');
      setOpen(false);
      setDate('');
      setStartTime('');
      setEndTime('');
    } catch {
      toast.error('Could not reach the booking service.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="w-full rounded-full bg-zinc-950 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
      >
        Book Workspace Now
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5"
          onClick={e => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-black dark:text-white">
                  Book {studio.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500">
                  Instant booking · hourly rental
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => setDate(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="time"
                  value={startTime}
                  min="00:00"
                  onChange={e => {
                    setStartTime(e.target.value);
                    /* start pore change korle end o shathe adjust hobe (eta jeno always valid thake) */
                    if (endTime && e.target.value >= endTime)
                      setEndTime('');
                  }}
                  className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />
                <input
                  type="time"
                  value={endTime}
                  min={startTime || undefined}
                  onChange={e => setEndTime(e.target.value)}
                  className="rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
                />
              </div>
              {date && startTime && endTime && hours <= 0 && (
                <p className="text-xs font-medium text-red-500">
                  End time must be after start time.
                </p>
              )}

              <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
                <div className="flex justify-between text-sm dark:text-white">
                  <span className="text-zinc-500">
                    {hours > 0 ? `${hours} hr × $${studio.hourlyRate}` : 'Rate'}
                  </span>
                  <span className="font-black">${total || studio.hourlyRate}</span>
                </div>
                <div className="mt-2 flex justify-between text-xs dark:text-white">
                  <span className="text-zinc-500">Security deposit (refundable)</span>
                  <span className="font-bold">${studio.securityDeposit ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border border-zinc-300 py-3 font-bold transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                disabled={submitting}
                className="flex-1 rounded-full bg-zinc-950 py-3 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950"
              >
                {submitting ? 'Booking…' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
