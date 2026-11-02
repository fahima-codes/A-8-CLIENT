'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Aperture, Check, Loader2, X } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

type Validation = { ok: boolean; msg?: string };

function validatePassword(password: string): Validation {
  if (password.length < 6) {
    return { ok: false, msg: 'Password must be at least 6 characters.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { ok: false, msg: 'Password must have an Uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { ok: false, msg: 'Password must have a Lowercase letter.' };
  }
  return { ok: true };
}
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    image: '',
    password: '',
  });
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const wasTouched = form.password.length > 0;

  const handleChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const pwCheck = validatePassword(form.password);
    if (!pwCheck.ok) {
      toast.error(pwCheck.msg!);
      return;
    }
    if (form.password !== confirm) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.image || undefined,
    });

    if (error) {
      toast.error(error.message ?? 'Registration failed');
      setLoading(false);
      return;
    }

    toast.success('Account created! Please log in.');
    router.push('/login');
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
    setGoogleLoading(false);
  }

  const rule = (ok: boolean) =>
    ok ? 'text-emerald-600' : 'text-zinc-300 dark:text-zinc-600';

  return (
    <main className="grid min-h-[80vh] place-items-center bg-[#f7f7f5] px-5 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black dark:bg-white">
            <Aperture size={24} className="text-white dark:text-black" />
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Join StudioSpace — book or host creative spaces today
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4 rounded-3xl border border-zinc-200 bg-white p-7 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div>
            <label className="text-sm font-bold dark:text-white">Name</label>
            <input
              value={form.name}
              onChange={handleChange('name')}
              required
              placeholder="Rahim Ahmed"
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm font-bold dark:text-white">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              required
              placeholder="you@example.com"
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm font-bold dark:text-white">
              Photo URL <span className="text-zinc-400">(optional)</span>
            </label>
            <input
              type="url"
              value={form.image}
              onChange={handleChange('image')}
              placeholder="https://i.pravatar.cc/150?img=5"
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
          </div>

          <div>
            <label className="text-sm font-bold dark:text-white">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              required
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
            {/* live validation checklist */}
            {wasTouched && (
              <div className="mt-2 space-y-1 text-xs">
                <p className="flex items-center gap-1.5">
                  {form.password.length >= 6 ? (
                    <Check size={13} className="text-emerald-600" />
                  ) : (
                    <X size={13} className="text-red-400" />
                  )}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    At least 6 characters
                  </span>
                </p>
                <p className="flex items-center gap-1.5">
                  {/[A-Z]/.test(form.password) ? (
                    <Check size={13} className="text-emerald-600" />
                  ) : (
                    <X size={13} className="text-red-400" />
                  )}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    One uppercase letter
                  </span>
                </p>
                <p className="flex items-center gap-1.5">
                  {form.password.length === 0 ? null : /[a-z]/.test(
                      form.password,
                    ) ? (
                    <Check size={13} className="text-emerald-600" />
                  ) : (
                    <X size={13} className="text-red-400" />
                  )}
                  <span className="text-zinc-500 dark:text-zinc-400">
                    One lowercase letter
                  </span>
                </p>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-bold dark:text-white">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:focus:border-white"
            />
            {/* live match indicator */}
            {confirm.length > 0 && (
              <p
                className={`mt-2 text-xs ${
                  confirm === form.password
                    ? 'text-emerald-600'
                    : 'text-red-500'
                }`}
              >
                {confirm === form.password
                  ? 'Passwords match'
                  : 'Passwords do not match'}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-300"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Creating…
              </>
            ) : (
              'Register'
            )}
          </button>

          <div className="flex items-center gap-3 pt-1">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">
              or continue with
            </span>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-zinc-300 py-3 text-sm font-bold transition hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            {googleLoading ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <svg width="17" height="17" viewBox="0 0 48 48" aria-hidden>
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.5 30.4 0 24 0 14.6 0 6.5 5.4 2.5 13.3l7.9 6.2C12.3 13.3 17.6 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.5 6.9-17.7z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.4 28.5c-.5-1.4-.8-3-.8-4.5s.3-3.1.8-4.5l-7.9-6.2C.9 16.5 0 20.1 0 24s.9 7.5 2.5 10.7l7.9-6.2z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.4 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.8 2.3-8.2 2.3-6.4 0-11.7-3.8-13.6-9.2l-7.9 6.2C6.5 42.6 14.6 48 24 48z"
                />
              </svg>
            )}
            Register with Google
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-zinc-900 underline-offset-4 hover:underline dark:text-white"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
