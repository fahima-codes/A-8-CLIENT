'use client';
import { useState } from 'react';
import { toast } from 'sonner';

export default function BookModal({ studio }: any) {
  const [open, setOpen] = useState(false);
  const handleBook = () => {
    toast.success(`Booked ${studio.title} successfully!`);
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full rounded-full bg-zinc-950 px-5 py-4 text-sm font-extrabold text-white hover:bg-zinc-800"
      >
        Book Workspace Now
      </button>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5">
          <div className="w-full max-w-md rounded-3xl bg-white p-6">
            <h3 className="text-xl font-black">Book {studio.title}</h3>
            <div className="mt-4 space-y-3">
              <input
                type="date"
                className="w-full rounded-xl border px-4 py-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <input type="time" className="rounded-xl border px-4 py-3" />
                <input type="time" className="rounded-xl border px-4 py-3" />
              </div>
              <p className="text-sm text-zinc-500">
                Total: ${studio.hourlyRate} / hr
              </p>
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setOpen(false)}
                className="flex-1 rounded-full border py-3 font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleBook}
                className="flex-1 rounded-full bg-black py-3 font-bold text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
