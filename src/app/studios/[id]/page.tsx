import Link from 'next/link';
import {
  MapPin,
  Star,
  Users,
  ShieldCheck,
  Clock,
  ArrowLeft,
} from 'lucide-react';

type Props = { params: Promise<{ id: string }> };

type Studio = {
  _id: string;
  title: string;
  category: string;
  image: string;
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

  try {
    const res = await fetch(`${API_URL}/studios/${id}`, { cache: 'no-store' });

    if (res.ok) {
      const data = await res.json();
      studio = data.data ?? data;
    }
  } catch {
    // নিচে সব studio থেকে খোঁজার চেষ্টা হবে
  }

  if (!studio?.title) {
    try {
      const res = await fetch(`${API_URL}/studios`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        const list: Studio[] = Array.isArray(data) ? data : data.data ?? [];
        studio = list.find(item => item._id === id) ?? null;
      }
    } catch {
      studio = null;
    }
  }

  if (!studio) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#f7f7f5] px-5">
        <div className="max-w-md rounded-3xl border bg-white p-10 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            StudioSpace
          </p>
          <h1 className="mt-3 text-3xl font-black">Studio not found</h1>
          <p className="mt-2 text-sm text-zinc-500">
            This listing may have been removed or the link may be incorrect.
          </p>
          <Link
            href="/studios"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white"
          >
            <ArrowLeft size={16} /> Back to studios
          </Link>
        </div>
      </main>
    );
  }

  const amenities = studio.amenities ?? [];

  return (
    <main className="min-h-screen bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
        <Link
          href="/studios"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-zinc-600 transition hover:text-black"
        >
          <ArrowLeft size={16} /> Explore studios
        </Link>

        <section className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-sm">
          <div className="relative h-[300px] bg-zinc-200 sm:h-[440px] lg:h-[520px]">
            <img
              src={studio.image}
              alt={studio.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2 sm:left-8 sm:top-8">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-zinc-900">
                {studio.category}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-black/70 px-4 py-2 text-xs font-bold text-white">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                {studio.rating ?? 'New'}
                {studio.reviews ? ` · ${studio.reviews} reviews` : ''}
              </span>
            </div>

            <div className="absolute bottom-6 left-5 right-5 text-white sm:bottom-9 sm:left-9">
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-white/85">
                <MapPin size={16} /> {studio.location}
              </p>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-5xl">
                {studio.title}
              </h1>
            </div>
          </div>

          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_340px] lg:p-10">
            <div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  About this space
                </p>
                <h2 className="mt-2 text-2xl font-black text-zinc-950">
                  Made for your next big idea.
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-zinc-600">
                  {studio.overview}
                </p>
              </div>

              <div className="mt-9">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                  Studio highlights
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-white">
                      <Users size={18} />
                    </span>
                    <div>
                      <p className="text-xs text-zinc-500">Capacity</p>
                      <p className="font-bold">
                        {studio.maxCapacity ?? '—'} guests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4">
                    <span className="grid size-10 place-items-center rounded-xl bg-white">
                      <Clock size={18} />
                    </span>
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
                {amenities.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {amenities.map(amenity => (
                      <span
                        key={amenity}
                        className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-zinc-500">
                    Contact the host for amenity details.
                  </p>
                )}
              </div>

              <div className="mt-9 flex items-center gap-4 rounded-2xl border border-zinc-200 p-5">
                <div className="grid size-12 place-items-center rounded-full bg-zinc-100 text-lg font-black">
                  {(studio.ownerName ?? 'H').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Hosted by</p>
                  <p className="font-bold">
                    {studio.ownerName ?? 'Studio host'}
                  </p>
                  {studio.ownerEmail && (
                    <p className="text-sm text-zinc-500">{studio.ownerEmail}</p>
                  )}
                </div>
                <ShieldCheck className="ml-auto text-emerald-600" size={22} />
              </div>
            </div>

            <aside className="h-fit rounded-3xl border border-zinc-200 bg-[#fafaf9] p-6 lg:sticky lg:top-24">
              <p className="text-sm font-semibold text-zinc-500">
                Your creative space, by the hour
              </p>
              <p className="mt-2 text-4xl font-black">
                ${studio.hourlyRate}
                <span className="text-base font-semibold text-zinc-500">
                  {' '}
                  / hr
                </span>
              </p>

              <div className="my-6 space-y-3 border-y border-zinc-200 py-5 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Security deposit</span>
                  <span className="font-bold">
                    ${studio.securityDeposit ?? 0}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-zinc-500">Maximum capacity</span>
                  <span className="font-bold">
                    {studio.maxCapacity ?? '—'} people
                  </span>
                </div>
              </div>

              <Link
                href={`/studios/${studio._id}/book`}
                className="flex w-full justify-center rounded-full bg-zinc-950 px-5 py-4 text-sm font-extrabold text-white transition hover:bg-zinc-700"
              >
                Book this studio
              </Link>

              <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
                Select your date and hours to continue.
              </p>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudioDetailsPage;
