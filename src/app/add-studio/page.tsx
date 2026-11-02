'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ImagePlus, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import RequireAuth from '@/components/Shared/RequireAuth';

const IMGBB_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY;

export default function AddStudioPage() {
  return (
    <RequireAuth>
      <AddStudioContent />
    </RequireAuth>
  );
}

function AddStudioContent() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user
    ? { name: session.user.name ?? 'Host', email: session.user.email }
    : null;

  const [amenities, setAmenities] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Photo Studio',
    'Film Stage',
    'Podcast Lounge',
    'Music Suite',
    'Workshop',
    'Art Studio',
  ];

  // imgbb upload: file -> base64 -> https://api.imgbb.com
  async function handleImageUpload(file: File) {
    if (!IMGBB_KEY) {
      toast.error(
        'Image hosting key missing (NEXT_PUBLIC_IMGBB_KEY) — paste a URL instead.',
      );
      return;
    }
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>(resolve => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      const body = new FormData();
      body.append('image', base64.split(',')[1]);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
        { method: 'POST', body },
      );
      const json = await res.json();

      if (json?.data?.display_url) {
        setImageUrl(json.data.display_url);
        toast.success('Image uploaded!');
      } else {
        toast.error('Image upload failed — paste a URL instead.');
      }
    } catch {
      toast.error('Image upload failed — paste a URL instead.');
    } finally {
      setUploading(false);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please log in to add a studio.');
      router.push('/login?redirect=/add-studio');
      return;
    }
    if (!imageUrl) {
      toast.error('Please upload a studio image.');
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    const studioData = {
      title: String(data.get('title') ?? ''),
      category: String(data.get('category') ?? ''),
      hourlyRate: Number(data.get('hourlyRate')),
      deposit: Number(data.get('deposit') || 0),
      maxCapacity: Number(data.get('capacity')),
      location: String(data.get('location') ?? ''),
      image: imageUrl,
      amenities,
      overview: String(data.get('overview') ?? ''),
      hostName: user.name,
      hostEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/add-studio`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(studioData),
        },
      );

      if (res.ok) {
        toast.success('Studio added successfully!');
        router.push('/my-listings');
      } else {
        const err = await res.json().catch(() => null);
        toast.error(err?.message ?? 'Failed to add studio');
        setLoading(false);
      }
    } catch {
      toast.error('Could not reach the server');
      setLoading(false);
    }
  };

  const toggleAmenity = (item: string) => {
    setAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item],
    );
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-black tracking-tight dark:text-white">
        Add New Studio
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <input
          name="title"
          placeholder="Studio Title"
          required
          className="w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />

        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            required
            className="rounded-xl border border-zinc-200 p-2.5 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <input
            name="hourlyRate"
            type="number"
            min={1}
            placeholder="Hourly Rate ($)"
            required
            className="rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="deposit"
            type="number"
            min={0}
            placeholder="Security Deposit ($)"
            className="rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          <input
            name="capacity"
            type="number"
            min={1}
            placeholder="Max Capacity (people)"
            required
            className="rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
        </div>

        <input
          name="location"
          placeholder="Location / Address"
          required
          className="w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        />

        {/* imgbb upload + manual URL fallback */}
        <div>
          <label className="mb-2 flex w-fit cursor-pointer items-center gap-2 rounded-xl border border-dashed border-zinc-300 px-4 py-3 text-sm font-semibold transition hover:border-zinc-900 dark:border-zinc-700 dark:text-white">
            {uploading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ImagePlus size={16} />
            )}
            {uploading ? 'Uploading…' : 'Upload image (imgbb)'}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
            />
          </label>
          <input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="Image URL (auto-filled after upload)"
            required
            className="mt-2 w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Studio preview"
              className="mt-2 h-40 w-full rounded-xl object-cover"
            />
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium dark:text-white">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {[
              'WiFi',
              'AC',
              'Lighting Kit',
              'Backdrop',
              'Soundproof',
              'Parking',
            ].map(item => (
              <button
                type="button"
                key={item}
                onClick={() => toggleAmenity(item)}
                className={`rounded-full border border-zinc-200 px-3 py-1 text-sm transition dark:border-zinc-700 ${
                  amenities.includes(item)
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-white dark:bg-zinc-950 dark:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <textarea
          name="overview"
          placeholder="Detailed Overview"
          rows={4}
          required
          className="w-full rounded-xl border border-zinc-200 p-2.5 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
        ></textarea>

        {/* Read-only host info from real session */}
        <div className="grid grid-cols-2 gap-4">
          <input
            value={user?.name ?? 'Loading user…'}
            readOnly
            className="rounded-xl border border-zinc-200 bg-zinc-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
          <input
            value={user?.email ?? 'Loading user…'}
            readOnly
            className="rounded-xl border border-zinc-200 bg-zinc-100 p-2.5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>

        <button
          disabled={loading || uploading}
          className="w-full rounded-full bg-zinc-950 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950"
        >
          {loading ? 'Adding…' : 'Add Studio'}
        </button>
      </form>
    </div>
  );
}
