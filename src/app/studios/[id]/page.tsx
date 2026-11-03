import Link from 'next/link';
import {
  MapPin,
  Star,
  Users,
  ShieldCheck,
  Clock,
  ArrowLeft,
} from 'lucide-react';
import BookModal from '@/components/Studios/BookingModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

type Props = {
  params: Promise<{ id: string }>;
};

type Studio = {
  _id: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  location: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  amenities?: string[];
  overview: string;
  rating?: number;
  reviews?: number;
  ownerName?: string;
  ownerEmail?: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const StudioDetailsPage = async ({ params }: Props) => {
  const { id } = await params;

  let studio: Studio | null = null;
  let errorMessage = '';

  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  });

  if (!jwtToken?.token) {
    errorMessage = 'Please sign in and try again.';
  } else if (!API_URL) {
    errorMessage = 'API URL is not configured.';
  } else {
    try {
      const res = await fetch(`${API_URL}/studios/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken.token}`,
        },
        cache: 'no-store',
      });

      if (res.ok) {
        studio = (await res.json()) as Studio;
      } else if (res.status === 401) {
        errorMessage = 'Authentication failed. Please sign in again.';
      } else if (res.status === 404) {
        errorMessage = 'No studio was found with this ID.';
      } else {
        errorMessage = `Could not load the studio (HTTP ${res.status}).`;
      }
    } catch {
      errorMessage = 'Could not connect to the server.';
    }
  }
  if (!studio) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#f7f7f5] px-5">
        <div className="max-w-md rounded-3xl border bg-white p-10 text-center">
          <h1 className="text-2xl font-black">{errorMessage}</h1>

          <Link
            href="/studios"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={16} />
            Back to studios
          </Link>
        </div>
      </main>
    );
  }

  const amenities = studio.amenities ?? [];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          Explore studios
        </Link>

        <section className="overflow-hidden rounded-[32px] border bg-white shadow-sm">
          <div className="relative h-[300px] bg-zinc-200 sm:h-[480px]">
            <img
              src={studio.image}
              alt={studio.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <div className="absolute left-5 top-5 flex gap-2">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase">
                {studio.category}
              </span>

              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-white">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {studio.rating ?? 4.9} · {studio.reviews ?? 38} reviews
              </span>
            </div>

            <div className="absolute bottom-6 left-6 text-white">
              <p className="flex items-center gap-2 text-sm">
                <MapPin size={16} />
                {studio.location}
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-5xl">
                {studio.title}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_340px] lg:p-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                About this space
              </p>

              <p className="mt-4 leading-7 text-zinc-600">{studio.overview}</p>

              <div className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Studio highlights
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
                    <Users size={18} />
                    <div>
                      <p className="text-xs text-zinc-500">Capacity</p>
                      <p className="font-bold">
                        {studio.maxCapacity ?? 'N/A'} guests
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
                    <Clock size={18} />
                    <div>
                      <p className="text-xs text-zinc-500">Booking</p>
                      <p className="font-bold">Hourly rental</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  What this space offers
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {amenities.map(amenity => (
                    <span
                      key={amenity}
                      className="rounded-full border bg-white px-4 py-2 text-sm font-semibold"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-9 flex items-center gap-4 rounded-2xl border p-5">
                <div className="grid size-12 place-items-center rounded-full bg-zinc-100 font-black">
                  {(studio.ownerName ?? 'H')[0]}
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Hosted by</p>
                  <p className="font-bold">{studio.ownerName ?? 'Host'}</p>
                  <p className="text-sm text-zinc-500">{studio.ownerEmail}</p>
                </div>

                <ShieldCheck className="ml-auto text-emerald-600" />
              </div>

              <div className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Reviews
                </p>

                <div className="mt-3 rounded-2xl bg-zinc-50 p-5">
                  <p className="font-bold">
                    ⭐ {studio.rating ?? 4.9} ({studio.reviews ?? 38} reviews)
                  </p>

                  <p className="mt-2 text-sm text-zinc-600">
                    Amazing space! Lighting was perfect and host was super
                    helpful.
                  </p>
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-3xl border bg-[#fafaf9] p-6 lg:sticky lg:top-24">
              <p className="text-sm text-zinc-500">
                Your creative space, by the hour
              </p>

              <p className="mt-2 text-4xl font-black">
                ${studio.hourlyRate}
                <span className="text-base font-semibold text-zinc-500">
                  {' '}
                  / hr
                </span>
              </p>

              <div className="my-6 space-y-3 border-y py-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Security deposit</span>
                  <span className="font-bold">
                    ${studio.securityDeposit ?? 0}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Maximum capacity</span>
                  <span className="font-bold">
                    {studio.maxCapacity ?? 'N/A'} people
                  </span>
                </div>
              </div>

              <BookModal studio={studio} />
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
