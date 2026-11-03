'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { getAuthToken } from '@/lib/getTokenFromServer';
import RequireAuth from '@/components/Shared/RequireAuth';

type Studio = {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  image: string;
  hostEmail?: string;
  ownerEmail?: string;
};

export default function MyListingsPage() {
  return (
    <RequireAuth>
      <MyListingsContent />
    </RequireAuth>
  );
}

function MyListingsContent() {
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;
  const userName = session?.user?.name;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<Studio | null>(null);

  useEffect(() => {
    async function fetchMyStudios() {
      if (!userEmail) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/studios?email=${userEmail}`,
          {
            cache: 'no-store',
          },
        );

        if (!res.ok) throw new Error('Could not load studios');

        const data = await res.json();
        const list: Studio[] = Array.isArray(data) ? data : data.data ?? [];

        // API filter fail korle client-side fallback
        setStudios(
          list.filter(
            studio =>
              (studio.hostEmail ?? studio.ownerEmail)?.toLowerCase() ===
              userEmail.toLowerCase(),
          ),
        );
      } catch (error) {
        console.error(error);
        toast.error('Failed to load listings');
      } finally {
        setLoading(false);
      }
    }

    fetchMyStudios();
  }, [userEmail]);

  async function handleDeleteConfirmed() {
    if (!deleteTarget) return;
    const id = deleteTarget._id;

    try {
      const token = await getAuthToken();

      if (!token) {
        toast.error('Could not get your login token. Please sign in again.');
        setDeleteTarget(null);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error('Delete failed');

      setStudios(current => current.filter(studio => studio._id !== id));
      toast.success('Studio deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Could not delete studio');
    } finally {
      setDeleteTarget(null);
    }
  }

  if (loading) {
    return (
      <main className="mx-auto grid max-w-6xl gap-6 p-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map(item => (
          <div
            key={item}
            className="h-72 animate-pulse rounded-3xl bg-zinc-200"
          />
        ))}
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              Host dashboard
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">
              My Listings
            </h1>
            <p className="mt-2 text-zinc-500">
              Manage your creative spaces · {studios.length} found
            </p>
          </div>
          <Link
            href="/add-studio"
            className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white"
          >
            + Add New Studio
          </Link>
        </div>

        {studios.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center">
            <div className="text-4xl">🎬</div>
            <h2 className="mt-4 text-xl font-bold">No studios found</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Add a studio with your account{userName ? ` (${userName})` : ''} to
              see it here.
            </p>
            <Link
              href="/add-studio"
              className="mt-6 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white"
            >
              Add your first studio
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map(studio => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-52 bg-zinc-200">
                  <img
                    src={studio.image}
                    alt={studio.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold">
                    {studio.category}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="font-bold">{studio.title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    {studio.location}
                  </p>
                  <p className="mt-3 text-lg font-black">
                    ${studio.hourlyRate}
                    <span className="text-sm font-medium text-zinc-500">
                      {' '}
                      / hr
                    </span>
                  </p>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="flex-1 rounded-full border border-zinc-300 py-2.5 text-center text-sm font-bold hover:bg-zinc-50"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(studio)}
                      className="flex-1 rounded-full bg-red-50 py-2.5 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Custom delete confirmation modal (NOT window.confirm) */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-5"
          onClick={e => e.target === e.currentTarget && setDeleteTarget(null)}
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center dark:bg-zinc-900">
            {/* preview */}
            <img
              src={deleteTarget.image}
              alt={deleteTarget.title}
              className="mx-auto h-24 w-36 rounded-2xl object-cover"
            />
            <h3 className="mt-4 text-lg font-black dark:text-white">
              Delete “{deleteTarget.title}”?
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              This will permanently remove the listing from StudioSpace. This
              action cannot be undone.
            </p>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-full border border-zinc-300 py-3 font-bold transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Keep it
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="flex-1 rounded-full bg-red-600 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
