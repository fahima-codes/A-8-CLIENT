'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

/**
 * Private route guard — client-side.
 * Session refresh delay-safe: logged-in user reloading a private route never bounces to /login.
 */
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Session load seselge define + user nai — then redirect
    if (!isPending && session?.user == null) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, session, router, pathname]);

  // Session checking cholta kolpa — full-page spinner (reload-safe)
  if (isPending || session?.user == null) {
    return (
      <main className="grid min-h-[70vh] place-items-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black dark:border-zinc-800 dark:border-t-white" />
      </main>
    );
  }

  return <>{children}</>;
}
