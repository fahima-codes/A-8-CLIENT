'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import RequireAuth from '@/components/Shared/RequireAuth';
import { getAuthToken } from '@/lib/getTokenFromServer';

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  overview: string;
  maxGuests: number;
  amenities: string[];
};

export default function EditStudioPage() {
  return (
    <RequireAuth>
      <EditStudioContent />
    </RequireAuth>
  );
}

function EditStudioContent() {
  const { id } = useParams();
  const router = useRouter();
  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Old data load
  useEffect(() => {
    async function fetchStudio() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
      );
      const data = await res.json();
      setStudio(data);
      setLoading(false);
    }
    if (id) fetchStudio();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdating(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const updatedStudio = {
      title: formData.get('title'),
      category: formData.get('category'),
      hourlyRate: Number(formData.get('hourlyRate')),
      location: formData.get('location'),
      image: formData.get('image'),
      overview: formData.get('overview'),
      maxGuests: Number(formData.get('maxGuests')),
    };

    try {
      const token = await getAuthToken();

      if (!token) {
        toast.error('Could not get your login token. Please sign in again.');
        setUpdating(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedStudio),
        },
      );

      if (res.ok) {
        toast.success('Studio updated successfully!');
        router.push('/my-listings');
      } else {
        toast.error('Failed to update studio');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!studio) return <div className="p-20 text-center">Studio not found</div>;

  return (
    <div className="min-h-screen bg-[#f7f7f5] py-10">
      <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-black">Edit Studio</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Update your creative space info
        </p>

        <form onSubmit={handleUpdate} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-bold">Studio Title</label>
            <input
              name="title"
              defaultValue={studio.title}
              required
              className="mt-1 w-full rounded-xl border px-4 py-3 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold">Category</label>
              <select
                name="category"
                defaultValue={studio.category}
                className="mt-1 w-full rounded-xl border px-4 py-3"
              >
                <option>Photo Studio</option>
                <option>Film Stage</option>
                <option>Podcast Lounge</option>
                <option>Music Suite</option>
                <option>Workshop</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold">Hourly Rate ($)</label>
              <input
                name="hourlyRate"
                type="number"
                defaultValue={studio.hourlyRate}
                required
                className="mt-1 w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-bold">Location</label>
              <input
                name="location"
                defaultValue={studio.location}
                required
                className="mt-1 w-full rounded-xl border px-4 py-3"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Max Guests</label>
              <input
                name="maxGuests"
                type="number"
                defaultValue={studio.maxGuests}
                className="mt-1 w-full rounded-xl border px-4 py-3"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold">Image URL</label>
            <input
              name="image"
              defaultValue={studio.image}
              required
              className="mt-1 w-full rounded-xl border px-4 py-3"
            />
          </div>

          <div>
            <label className="text-sm font-bold">Overview</label>
            <textarea
              name="overview"
              defaultValue={studio.overview}
              rows={4}
              className="mt-1 w-full rounded-xl border px-4 py-3"
            ></textarea>
          </div>

          <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-600">
            <p>
              <span className="font-bold">Host Email:</span> (read-only) - from
              auth
            </p>
          </div>

          <button
            disabled={updating}
            className="w-full rounded-full bg-zinc-950 py-3.5 font-bold text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {updating ? 'Updating...' : 'Update Studio'}
          </button>
        </form>
      </div>
    </div>
  );
}
