'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddStudioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // TODO: NextAuth theke niba
  const user = { name: 'Rahim Ahmed', email: 'rahim@test.com' };
  const [amenities, setAmenities] = useState<string[]>([]);

  const categories = [
    'Photo Studio',
    'Film Stage',
    'Podcast Lounge',
    'Music Suite',
    'Workshop',
    'Art Studio',
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const studioData = {
      title: form.title.value,
      category: form.category.value,
      hourlyRate: Number(form.hourlyRate.value),
      deposit: Number(form.deposit.value),
      maxCapacity: Number(form.capacity.value),
      location: form.location.value,
      image: form.image.value,
      amenities: amenities,
      overview: form.overview.value,
      hostName: user.name,
      hostEmail: user.email,
      createdAt: new Date(),
    };

    // API call to MongoDB
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studioData),
    });

    if (res.ok) {
      toast.success('Studio added successfully!');
      router.push('/my-listings');
    } else {
      toast.error('Failed to add studio');
    }
    setLoading(false);
  };

  const toggleAmenity = (item: string) => {
    setAmenities(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item],
    );
  };

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Studio</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border bg-white p-6"
      >
        <input
          name="title"
          placeholder="Studio Title"
          required
          className="w-full rounded-lg border p-2.5"
        />

        <div className="grid grid-cols-2 gap-4">
          <select name="category" required className="rounded-lg border p-2.5">
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
            placeholder="Hourly Rate ($)"
            required
            className="rounded-lg border p-2.5"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="deposit"
            type="number"
            placeholder="Security Deposit ($)"
            className="rounded-lg border p-2.5"
          />
          <input
            name="capacity"
            type="number"
            placeholder="Max Capacity (people)"
            required
            className="rounded-lg border p-2.5"
          />
        </div>

        <input
          name="location"
          placeholder="Location / Address"
          required
          className="w-full rounded-lg border p-2.5"
        />
        <input
          name="image"
          placeholder="Image URL"
          required
          className="w-full rounded-lg border p-2.5"
        />

        <div>
          <p className="mb-2 text-sm font-medium">Amenities</p>
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
                className={`rounded-full border px-3 py-1 text-sm ${
                  amenities.includes(item) ? 'bg-black text-white' : 'bg-white'
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
          className="w-full rounded-lg border p-2.5"
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            value={user.name}
            readOnly
            className="rounded-lg border bg-zinc-100 p-2.5"
          />
          <input
            value={user.email}
            readOnly
            className="rounded-lg border bg-zinc-100 p-2.5"
          />
        </div>

        <button
          disabled={loading}
          className="w-full rounded-full bg-black py-3 text-white font-medium"
        >
          {loading ? 'Adding...' : 'Add Studio'}
        </button>
      </form>
    </div>
  );
}
